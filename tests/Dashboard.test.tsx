import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
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
});
