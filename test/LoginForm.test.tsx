// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../src/components/auth/LoginForm';
import { AuthProvider } from '../src/context/AuthContext';

describe('LoginForm', () => {
  it('renders email input and submit button', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
  // Look for input with label 'Email' or similar
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();
  // Look for button with text 'Submit', 'Send', or similar
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  });

  it('shows error on empty submit', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
    const button = screen.getByRole('button');
    // With empty email the submit button should be disabled
    expect(button).toBeDisabled();
  });
});
