import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import { App } from '../src/App';
import { PetDetailScreen } from '../src/screens/PetDetail';
import { DEFAULT_PET_NOTES, usePetStore } from '../src/stores/pet';

const DOGS = [
  { id: 'meg', name: 'Meg' },
  { id: 'snoopy', name: 'Snoopy' },
  { id: 'lucy', name: 'Lucy' },
  { id: 'kali', name: 'Kali' },
  { id: 'lila', name: 'Lila' },
  { id: 'luke', name: 'Luke' },
];

describe('PetDetailScreen', () => {
  beforeEach(() => {
    usePetStore.setState({ selectedPetId: null, petNotes: DEFAULT_PET_NOTES });
  });

  it('loads pet data from the route petId prop', () => {
    render(<PetDetailScreen petId="biscoito" />);

    expect(screen.getAllByText('Biscoito').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Shih Tzu').length).toBeGreaterThan(0);
  });

  it.each(DOGS)('resolves the $name profile from its id', ({ id, name }) => {
    render(<PetDetailScreen petId={id} />);

    expect(screen.getAllByText(name).length).toBeGreaterThan(0);
  });

  it('falls back to the selected pet store when no petId prop is provided', () => {
    usePetStore.setState({ selectedPetId: 'mel' });

    render(<PetDetailScreen />);

    expect(screen.getAllByText('Mel').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SRD · Pequeno porte').length).toBeGreaterThan(0);
  });

  it('switches between about, health, and notes tabs', async () => {
    const user = userEvent.setup();

    render(<PetDetailScreen petId="biscoito" />);

    expect(screen.getByText('Data de nascimento')).toBeInTheDocument();
    expect(screen.queryByText('Vermifugação')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Saúde' }));

    expect(screen.getByText('Vermifugação')).toBeInTheDocument();
    expect(screen.queryByText('Data de nascimento')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Notas' }));

    expect(screen.getByDisplayValue(/Biscoito precisa de pausas/)).toBeInTheDocument();
    expect(screen.queryByText('Vermifugação')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sobre' }));

    expect(screen.getByText('Data de nascimento')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Biscoito notes' })).not.toBeInTheDocument();
  });

  it('saves edited notes for the current pet', async () => {
    const user = userEvent.setup();
    const newNote = 'Evitar praia em dias muito quentes.';

    render(<PetDetailScreen petId="biscoito" />);

    await user.click(screen.getByRole('button', { name: 'Notas' }));
    const notes = screen.getByRole('textbox', { name: 'Biscoito notes' });

    await user.clear(notes);
    await user.type(notes, newNote);

    expect(usePetStore.getState().petNotes.biscoito).toBe(newNote);

    await user.click(screen.getByRole('button', { name: 'Saúde' }));
    await user.click(screen.getByRole('button', { name: 'Notas' }));

    expect(screen.getByRole('textbox', { name: 'Biscoito notes' })).toHaveValue(newNote);
  });

  it('keeps notes scoped to each dog id', async () => {
    const user = userEvent.setup();
    usePetStore.getState().setPetNote('snoopy', 'Snoopy gosta de cenoura.');

    render(<PetDetailScreen petId="lucy" />);
    await user.click(screen.getByRole('button', { name: 'Notas' }));

    expect(screen.getByRole('textbox', { name: 'Lucy notes' })).toHaveValue('');
    expect(usePetStore.getState().petNotes.biscoito).toBe(DEFAULT_PET_NOTES.biscoito);
  });

  it('opens the same profile when a dog is picked on the dashboard', async () => {
    const user = userEvent.setup();
    const location = memoryLocation({ path: '/dashboard', record: true });

    render(
      <Router hook={location.hook}>
        <App />
      </Router>
    );

    await user.click(screen.getByRole('button', { name: /^lila/i }));

    expect(location.history[location.history.length - 1]).toBe('/pets/lila');
    expect(screen.getAllByText('Lila').length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: 'Olá!' })).toBeNull();
  });
});
