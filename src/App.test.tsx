import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should edit task when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const editButton = screen.getByText('Edit 1');

    await user.click(editButton);

    const input = screen.getByRole('textbox', { name: 'Edit Task:' });
    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.type(input, ' Edited');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Learn React Edited')).toBeInTheDocument();
    });
  });

  test('should delete task when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const deleteButton = screen.getByText('Delete 1');

    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
    });
  });
});

// const user = userEvent.setup();
//     render(<App />);

//     const deleteOption = screen.getByRole('button', {name: 'Delete'})

//     await user.click(deleteOption);

//     await waitFor(()=>{
//       expect(screen.)
//     })
