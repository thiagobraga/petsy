import '@testing-library/jest-dom';
import React from 'react';

// Setup mock window objects required by components.jsx
(window as any).React = React;
(global as any).React = React;

(window as any).TOKENS = {
  pink: '#ED8FAA',
  pinkHover: '#E57395',
  pinkSoft: '#F8D8E1',
  pinkPale: '#FCEEF2',
  ink: '#3A2620',
  ink2: '#73615A',
  ink3: '#A69B97',
  border: '#E0E0E0',
  surface: '#FFFFFF',
  rPill: 999,
  bgDeep: '#F5EBE1',
  warn: '#F2A03D',
  ok: '#5B8451',
  danger: '#D9534F',
  fontDisplay: 'Fredoka, sans-serif',
};

(window as any).I = {
  check: () => <svg data-testid="icon-check" />,
};

// Mock custom element
if (!customElements.get('image-slot')) {
  class ImageSlot extends HTMLElement {}
  customElements.define('image-slot', ImageSlot);
}
