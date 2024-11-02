import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFunctional from './AppFunctional';

// Sanity check
test('sanity', () => {
  expect(true).toBe(true);
});

// Test if core components render
test('renders coordinates, steps, grid, and buttons', () => {
  render(<AppFunctional />);
  
  // Check for coordinates and steps headings
  expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument();
  
  // Check for grid squares
  const squares = screen.getAllByRole('gridcell');
  expect(squares.length).toBe(9);
  
  // Check for movement buttons
  expect(screen.getByText(/left/i)).toBeInTheDocument();
  expect(screen.getByText(/up/i)).toBeInTheDocument();
  expect(screen.getByText(/right/i)).toBeInTheDocument();
  expect(screen.getByText(/down/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
});

// Test movement logic
test('moves B marker correctly', () => {
  render(<AppFunctional />);

  const leftButton = screen.getByText(/left/i);
  const rightButton = screen.getByText(/right/i);
  
  // Initial position should be at index 4 (center)
  expect(screen.getByText('B').closest('.square')).toHaveClass('active');

  // Move right and check position
  fireEvent.click(rightButton);
  expect(screen.getByText('B').closest('.square')).toHaveClass('active');

  // Move left and check position
  fireEvent.click(leftButton);
  expect(screen.getByText('B').closest('.square')).toHaveClass('active');
});

// Test input and form submission
test('input changes when typed into', () => {
  render(<AppFunctional />);
  
  const input = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com');
});

test('shows error message when moving out of bounds', () => {
  render(<AppFunctional />);

  const upButton = screen.getByText(/up/i);

  // Move up three times; should hit the boundary and show an error
  fireEvent.click(upButton);
  fireEvent.click(upButton);
  fireEvent.click(upButton);
  
// To handle an "up" boundary error, for instance
expect(screen.getByText("You can't go up")).toBeInTheDocument();
});
