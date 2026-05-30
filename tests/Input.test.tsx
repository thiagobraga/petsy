import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Setup mock window objects required by components.jsx
beforeAll(() => {
  (window as any).TOKENS = {
    pink: '#ED8FAA',
    border: '#E0E0E0',
    surface: '#FFFFFF',
    rPill: 999,
  };
  (window as any).I = {};
});

import '../src/components.jsx';

const Input = (window as any).Input;

describe('Input', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('updates value on change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type here');
    
    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders icon and trailing icon', () => {
    render(<Input placeholder="Enter text" icon={<span>LeftIcon</span>} trailing={<span>RightIcon</span>} />);
    expect(screen.getByText('LeftIcon')).toBeInTheDocument();
    expect(screen.getByText('RightIcon')).toBeInTheDocument();
  });
});
