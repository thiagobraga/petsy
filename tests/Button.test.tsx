import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Setup mock window objects required by components.jsx
beforeAll(() => {
  (window as any).TOKENS = {
    pink: '#ED8FAA',
    pinkHover: '#E57395',
    pinkSoft: '#F8D8E1',
    pinkPale: '#FCEEF2',
    ink: '#3A2620',
    rPill: 999,
  };
  (window as any).I = {};
});

// Import the file so it attaches components to window
import '../src/components.jsx';

const Button = (window as any).Button;

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders icons', () => {
    render(<Button icon={<span>LeftIcon</span>} iconRight={<span>RightIcon</span>}>Click me</Button>);
    expect(screen.getByText('LeftIcon')).toBeInTheDocument();
    expect(screen.getByText('RightIcon')).toBeInTheDocument();
  });
});
