import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { PetDetailScreen } from '../src/screens/PetDetail';
import { usePetStore } from '../src/stores/pet';

describe('PetDetailScreen', () => {
  beforeEach(() => {
    usePetStore.setState({ selectedPetId: null });
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

    expect(screen.getByText(/Luna tem alergia leve/)).toBeInTheDocument();
    expect(screen.queryByText('Vermifugação')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sobre' }));

    expect(screen.getByText('Data de nascimento')).toBeInTheDocument();
    expect(screen.queryByText(/Luna tem alergia leve/)).not.toBeInTheDocument();
  });
});
