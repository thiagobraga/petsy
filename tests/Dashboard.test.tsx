import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { DashboardScreen } from '../src/screens/Dashboard';

describe('DashboardScreen', () => {
  it('renders the greeting and quick actions', () => {
    render(<DashboardScreen />);

    expect(screen.getByRole('heading', { name: 'Olá!' })).toBeInTheDocument();
    expect(screen.getByText('Vamos cuidar dos seus pets hoje')).toBeInTheDocument();

    for (const label of ['Novo Pet', 'Medicação', 'Calendário', 'Histórico']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders today's medications including the overdue warning", () => {
    render(<DashboardScreen />);

    expect(screen.getByText('Medicações de Hoje')).toBeInTheDocument();
    for (const name of ['Carprofeno', 'Antibiótico', 'Ômega 3', 'Colírio']) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getByText('1h em atraso')).toBeInTheDocument();
  });

  it('renders pets, upcoming events and reminders', () => {
    render(<DashboardScreen />);

    for (const pet of ['Mel', 'Thor', 'Nina', 'Luna']) {
      expect(screen.getAllByText(pet).length).toBeGreaterThan(0);
    }
    expect(screen.getByText('Aniversário da Nina')).toBeInTheDocument();
    expect(screen.getByText('Alerta de castração da Luna')).toBeInTheDocument();
    expect(screen.getByText('1 medicação em atraso')).toBeInTheDocument();
  });

  it('toggles a medication as taken', async () => {
    const user = userEvent.setup();
    render(<DashboardScreen />);

    const toggle = screen.getByRole('button', { name: /marcar ômega 3 como tomada/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('opens and closes the sidebar overlay', async () => {
    const user = userEvent.setup();
    render(<DashboardScreen />);

    // closed → drawer hidden from the a11y tree
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    expect(screen.getByRole('dialog', { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /configurações/i })).toBeInTheDocument();

    // backdrop + X both expose "Fechar menu"; clicking either closes
    await user.click(screen.getAllByRole('button', { name: /fechar menu/i })[0]);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
