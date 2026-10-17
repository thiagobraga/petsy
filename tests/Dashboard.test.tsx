import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import { DashboardScreen } from '../src/screens/Dashboard';
import { DEFAULT_PET_NOTES, usePetStore } from '../src/stores/pet';

const DOGS = ['Meg', 'Snoopy', 'Lucy', 'Kali', 'Lila', 'Luke'];

function renderDashboard() {
  const location = memoryLocation({ path: '/dashboard', record: true });
  render(
    <Router hook={location.hook}>
      <DashboardScreen />
    </Router>
  );
  return { ...location, current: () => location.history[location.history.length - 1] };
}

const section = (name: string) => screen.getByRole('region', { name });

describe('DashboardScreen', () => {
  beforeEach(() => {
    usePetStore.setState({ selectedPetId: null, petNotes: DEFAULT_PET_NOTES });
  });

  it('renders the greeting and quick actions', () => {
    renderDashboard();

    expect(screen.getByRole('heading', { name: 'Olá!' })).toBeInTheDocument();
    expect(screen.getByText('Vamos cuidar dos seus pets hoje')).toBeInTheDocument();

    for (const label of ['Novo Pet', 'Medicação', 'Calendário', 'Histórico']) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeInTheDocument();
    }
  });

  it('routes enabled quick actions and disables the ones without a screen', async () => {
    const user = userEvent.setup();
    const location = renderDashboard();

    for (const label of [/novo pet/i, /histórico/i]) {
      const action = screen.getByRole('button', { name: label });
      expect(action).toBeDisabled();
      expect(action).toHaveAccessibleName(expect.stringMatching(/em breve/i));
    }

    await user.click(screen.getByRole('button', { name: /^medicação$/i }));
    expect(location.current()).toBe('/medicines');

    await user.click(screen.getByRole('button', { name: /^calendário$/i }));
    expect(location.current()).toBe('/appointments');
  });

  it('lists the six dogs with identified portraits', () => {
    renderDashboard();

    const pets = section('Meus Pets');
    for (const name of DOGS) {
      expect(within(pets).getByText(name)).toBeInTheDocument();
      expect(within(pets).getByRole('img', { name: new RegExp(name) })).toBeInTheDocument();
    }
    // every pet is already on screen, so there is no redundant "see all" link
    expect(within(pets).queryByText(/ver todos/i)).toBeNull();
  });

  it('opens the matching profile when a pet card is picked', async () => {
    const user = userEvent.setup();
    const location = renderDashboard();

    await user.click(within(section('Meus Pets')).getByRole('button', { name: /^snoopy/i }));

    expect(location.current()).toBe('/pets/snoopy');
    expect(usePetStore.getState().selectedPetId).toBe('snoopy');
  });

  it('links medications and events to their screens', async () => {
    const user = userEvent.setup();
    const location = renderDashboard();

    await user.click(
      within(section('Medicações de Hoje')).getByRole('button', { name: /ver todas/i })
    );
    expect(location.current()).toBe('/medicines');

    const events = section('Próximos Eventos');
    await user.click(within(events).getByRole('button', { name: /ver todos/i }));
    expect(location.current()).toBe('/appointments');

    await user.click(within(events).getByRole('button', { name: /consulta do snoopy/i }));
    expect(location.current()).toBe('/appointments');
  });

  it("renders today's medications including the overdue warning", () => {
    renderDashboard();

    const meds = section('Medicações de Hoje');
    for (const name of ['Carprofeno', 'Antibiótico', 'Ômega 3', 'Colírio']) {
      expect(within(meds).getByText(name)).toBeInTheDocument();
    }
    expect(within(meds).getByText('1h em atraso')).toBeInTheDocument();
    expect(screen.getByText('1 medicação em atraso')).toBeInTheDocument();
  });

  it('toggles a pending medication as taken and back', async () => {
    const user = userEvent.setup();
    renderDashboard();

    const toggle = screen.getByRole('button', { name: /marcar ômega 3 como tomada/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('unmarks a dose that started as completed', async () => {
    const user = userEvent.setup();
    renderDashboard();

    const toggle = screen.getByRole('button', { name: /marcar carprofeno como tomada/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('clears and restores the overdue warning with the dose state', async () => {
    const user = userEvent.setup();
    renderDashboard();

    const toggle = screen.getByRole('button', { name: /marcar colírio como tomada/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('1h em atraso')).toBeNull();
    expect(screen.getByText('Nenhuma medicação em atraso')).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('1h em atraso')).toBeInTheDocument();
    expect(screen.getByText('1 medicação em atraso')).toBeInTheDocument();
  });

  it('opens and closes the sidebar overlay', async () => {
    const user = userEvent.setup();
    renderDashboard();

    // closed → drawer hidden from the a11y tree
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });
    expect(dialog).toBeInTheDocument();

    // backdrop + X both expose "Fechar menu"; clicking either closes
    await user.click(screen.getAllByRole('button', { name: /fechar menu/i })[0]);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('navigates from the sidebar and disables entries without a screen', async () => {
    const user = userEvent.setup();
    const location = renderDashboard();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });

    for (const label of [/configurações/i, /ajuda/i]) {
      const item = within(dialog).getByRole('button', { name: label });
      expect(item).toBeDisabled();
      expect(item).toHaveAccessibleName(expect.stringMatching(/em breve/i));
    }

    await user.click(within(dialog).getByRole('button', { name: /medicações/i }));
    expect(location.current()).toBe('/medicines');
  });
});
