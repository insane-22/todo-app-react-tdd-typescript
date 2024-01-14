import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
