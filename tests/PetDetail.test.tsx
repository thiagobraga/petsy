import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetDetailScreen } from '../src/screens/PetDetail';
import { DEFAULT_PET_NOTES, usePetStore } from '../src/stores/pet';

describe('PetDetailScreen', () => {
  beforeEach(() => {
    usePetStore.setState({ selectedPetId: null, petNotes: DEFAULT_PET_NOTES });
  });

  it('loads pet data from the route petId prop', () => {
    render(<PetDetailScreen petId="biscoito" />);

    expect(screen.getAllByText('Biscoito').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Shih Tzu').length).toBeGreaterThan(0);
  });

  it('falls back to the selected pet store when no petId prop is provided', () => {
    usePetStore.setState({ selectedPetId: 'mel' });

    render(<PetDetailScreen />);

    expect(screen.getAllByText('Mel').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SRD · Pequeno porte').length).toBeGreaterThan(0);
  });

  it('switches between about, health, and notes tabs', async () => {
    const user = userEvent.setup();

    render(<PetDetailScreen petId="luna" />);

    expect(screen.getByText('Data de nascimento')).toBeInTheDocument();
    expect(screen.queryByText('Vermifugação')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Saúde' }));

    expect(screen.getByText('Vermifugação')).toBeInTheDocument();
    expect(screen.queryByText('Data de nascimento')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Notas' }));

    expect(screen.getByDisplayValue(/Luna tem alergia leve/)).toBeInTheDocument();
    expect(screen.queryByText('Vermifugação')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sobre' }));

    expect(screen.getByText('Data de nascimento')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Luna notes' })).not.toBeInTheDocument();
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
});
