import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { DIARY } from '../src/data';
import { DiaryScreen } from '../src/screens/Diary';

describe('DiaryScreen', () => {
  it('renders the timeline entries from the DIARY data set', () => {
    render(<DiaryScreen />);

    for (const entry of DIARY) {
      expect(screen.getByText(entry.title)).toBeInTheDocument();
      expect(screen.getByText(entry.body)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(entry.date.toUpperCase()))).toBeInTheDocument();
    }
  });
});
