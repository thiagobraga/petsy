import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Example test for Button component
// This demonstrates the testing pattern for Petsy components

describe('Button', () => {
  it('renders with text', () => {
    // Note: Update import path when Button component is moved to src/components.tsx
    const Button = ({ children }: { children: React.ReactNode }) => (
      <button>{children}</button>
    );

    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const Button = ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: () => void;
    }) => <button onClick={onClick}>{children}</button>;

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('respects disabled state', () => {
    const Button = ({ disabled }: { disabled?: boolean; children: React.ReactNode }) => (
      <button disabled={disabled}>Click me</button>
    );

    const { rerender } = render(<Button disabled={false}>Click me</Button>);
    expect(screen.getByRole('button')).not.toBeDisabled();

    rerender(<Button disabled={true}>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
