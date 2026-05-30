import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { MEDS } from '../src/data';
import { MedicinesScreen } from '../src/screens/Medicines';

describe('MedicinesScreen', () => {
  it('renders medicines from the MEDS data set by default', () => {
    render(<MedicinesScreen />);

    for (const medicine of MEDS) {
      expect(screen.getAllByText(medicine.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(medicine.next).length).toBeGreaterThan(0);
    }
  });

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

  it('toggles a dose between Aplicar and Aplicada', async () => {
    const user = userEvent.setup();

    render(<MedicinesScreen petFilter="luna" />);

    expect(screen.getByLabelText('A dar: 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Aplicadas: 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Apoquel 08:00 aplicada' }));

    expect(screen.getByRole('button', { name: 'Apoquel 08:00 aplicar' })).toBeInTheDocument();
    expect(screen.getByLabelText('A dar: 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Aplicadas: 0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Bravecto Domingo aplicar' }));

    expect(screen.getByRole('button', { name: 'Bravecto Domingo aplicada' })).toBeInTheDocument();
    expect(screen.getByLabelText('A dar: 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Aplicadas: 1')).toBeInTheDocument();
  });
});
