import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MEDS, PETS } from '../src/data';
import { DashboardScreen } from '../src/screens/Dashboard';
import { usePetStore } from '../src/stores/pet';

describe('DashboardScreen', () => {
  beforeEach(() => {
    usePetStore.setState({ selectedPetId: null });
  });

  it('stores the selected pet when a pet card is clicked', async () => {
    const user = userEvent.setup();

    render(<DashboardScreen />);

    await user.click(screen.getAllByRole('button', { name: /Biscoito/i })[0]);

    expect(usePetStore.getState().selectedPetId).toBe('biscoito');
  });

  it('renders pets and medicines from shared data fixtures', () => {
    render(<DashboardScreen />);

    for (const pet of PETS) {
      expect(screen.getAllByText(pet.name).length).toBeGreaterThan(0);
    }

    for (const med of MEDS.filter((item) => item.petId === 'luna')) {
      expect(screen.getByText(med.name)).toBeInTheDocument();
    }
  });
});
