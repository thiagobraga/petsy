import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LoginScreen } from '../src/screens/Login';
import { useAuthStore } from '../src/stores/auth';

beforeEach(() => {
  useAuthStore.setState({ currentUser: null, isLoggedIn: false });
});

describe('LoginScreen (integration)', () => {
  it('renders email and password fields and submit button', () => {
    render(<LoginScreen />);
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  it('pre-fills default credentials', () => {
    render(<LoginScreen />);
    expect(screen.getByPlaceholderText('Email address')).toHaveValue('test@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password');
  });

  it('shows validation error for invalid email', () => {
    render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(useAuthStore.getState().isLoggedIn).toBe(false);
  });

  it('shows validation error for short password', () => {
    render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(screen.getByText('Password must be at least 6 characters long.')).toBeInTheDocument();
    expect(useAuthStore.getState().isLoggedIn).toBe(false);
  });

  it('authenticates with valid credentials and sets auth state', () => {
    render(<LoginScreen />);
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.currentUser?.email).toBe('test@example.com');
    expect(state.currentUser?.name).toBe('test');
  });
});
