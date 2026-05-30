import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { MEDS } from '../src/data';
import { MedicinesScreen } from '../src/screens/Medicines';

describe('MedicinesScreen', () => {
  it('filters medicines by the selected pet chip', async () => {
    const user = userEvent.setup();

    render(<MedicinesScreen />);

    expect(screen.getByText(`${MEDS.length} med.`)).toBeInTheDocument();
    expect(screen.getAllByText('Apoquel').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Carprofeno').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /Mel/ }));

    expect(screen.getByText('1 med.')).toBeInTheDocument();
    expect(screen.getAllByText('Vermífugo NexGard').length).toBeGreaterThan(0);
    expect(screen.queryByText('Apoquel')).not.toBeInTheDocument();
    expect(screen.queryByText('Carprofeno')).not.toBeInTheDocument();
  });

  it('uses the petFilter prop as the initial filter', () => {
    render(<MedicinesScreen petFilter="biscoito" />);

    expect(screen.getByText('1 med.')).toBeInTheDocument();
    expect(screen.getAllByText('Carprofeno').length).toBeGreaterThan(0);
    expect(screen.queryByText('Apoquel')).not.toBeInTheDocument();
  });
});
