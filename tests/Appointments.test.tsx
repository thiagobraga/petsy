import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { APPOINTMENTS, EXAMS } from '../src/data';
import { AppointmentsScreen } from '../src/screens/Appointments';

const mayMarkedDays = Array.from(
  new Set(
    [...APPOINTMENTS, ...EXAMS]
      .filter((item) => item.date.split('/')[1] === '05')
      .map((item) => Number(item.date.split('/')[0]))
  )
).sort((a, b) => a - b);

describe('AppointmentsScreen', () => {
  it('marks calendar dates that have appointments or exams in May', () => {
    render(<AppointmentsScreen />);

    for (const day of mayMarkedDays) {
      const matcher = new RegExp(`Maio 2026 day ${day} marked`);
      expect(screen.getByRole('button', { name: matcher })).toBeInTheDocument();
    }

    expect(screen.getByRole('button', { name: 'Maio 2026 day 3' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Maio 2026 day 3 marked/ })
    ).not.toBeInTheDocument();
  });

  it('updates the selected day summary when a marked day is picked', async () => {
    const user = userEvent.setup();

    render(<AppointmentsScreen />);

    expect(screen.getByText('2 compromissos')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Maio 2026 day 21 marked/ }));

    expect(screen.getByText('QUI · 21 MAI')).toBeInTheDocument();
    expect(screen.getByText('1 compromisso')).toBeInTheDocument();
  });
});
