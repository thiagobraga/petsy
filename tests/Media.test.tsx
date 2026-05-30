import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { MEDIA } from '../src/data';
import { MediaScreen } from '../src/screens/Media';

describe('MediaScreen', () => {
  it('renders a photo grid with every media item', () => {
    render(<MediaScreen />);

    expect(screen.getByTestId('media-grid')).toHaveStyle({
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
    });
    const tiles = screen.getAllByTestId('media-tile');

    expect(tiles).toHaveLength(MEDIA.length);
    const leadTile = tiles[0];
    expect(leadTile).toHaveStyle({ gridColumn: 'span 2', gridRow: 'span 2' });
  });
});
