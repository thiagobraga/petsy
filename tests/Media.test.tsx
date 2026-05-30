import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('toggles between the photo grid and album view', async () => {
    const user = userEvent.setup();

    render(<MediaScreen />);

    expect(screen.getByTestId('media-grid')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Álbuns' }));

    expect(screen.queryByTestId('media-grid')).not.toBeInTheDocument();
    expect(screen.getAllByText('Praia 2026').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Adoção Mel').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Todas as fotos' }));

    expect(screen.getByTestId('media-grid')).toBeInTheDocument();
  });

  it('filters the media grid by pet chip selection', async () => {
    const user = userEvent.setup();

    render(<MediaScreen />);

    await user.click(screen.getByRole('button', { name: 'B Biscoito' }));

    const tiles = screen.getAllByTestId('media-tile');
    expect(tiles).toHaveLength(MEDIA.filter((item) => item.petId === 'biscoito').length);
    expect(tiles.map((tile) => tile.getAttribute('data-media-id'))).toEqual(['p3', 'p7']);
  });
});
