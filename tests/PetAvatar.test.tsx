import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Setup mock window objects required by components.jsx
beforeAll(() => {
  (window as any).TOKENS = {
    pinkSoft: '#F8D8E1',
    pink: '#ED8FAA',
    bgDeep: '#F5EBE1',
    warn: '#F2A03D',
    ok: '#5B8451',
    danger: '#D9534F',
    ink2: '#73615A',
    fontDisplay: 'Fredoka, sans-serif',
  };
  (window as any).I = {};

  // Mock the custom element image-slot to avoid warnings/errors
  if (!customElements.get('image-slot')) {
    class ImageSlot extends HTMLElement {}
    customElements.define('image-slot', ImageSlot);
  }
});

import '../src/components.jsx';

const PetAvatar = (window as any).PetAvatar;

describe('PetAvatar', () => {
  it('renders initials when no slot is provided', () => {
    render(<PetAvatar name="Luna" tone="pink" />);
    // Initial should be L
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('renders up to two initials correctly', () => {
    render(<PetAvatar name="Bella Swan" tone="pink" />);
    // Initials should be BS
    expect(screen.getByText('BS')).toBeInTheDocument();
  });

  it('renders custom image-slot when slot ID is provided', () => {
    const { container } = render(<PetAvatar name="Max" slot="pet-max-photo" />);
    const slot = container.querySelector('image-slot');
    expect(slot).toBeInTheDocument();
    expect(slot).toHaveAttribute('id', 'pet-max-photo');
  });
});
