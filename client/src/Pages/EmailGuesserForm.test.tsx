import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailGuesserForm from './EmailGuesserForm';
import { MantineProvider } from '@mantine/core';

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));
jest.mock('../constants', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
  },
}));
global.fetch = jest.fn();

const componentWrapper = (component: React.ReactNode) => (
  <MantineProvider>{component}</MantineProvider>
);

describe('EmailGuesserForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with correct fields', () => {
    render(componentWrapper(<EmailGuesserForm />));

    expect(screen.getByText('Email Guesser')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Company Domain')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('validates form inputs correctly', async () => {
    render(componentWrapper(<EmailGuesserForm />));

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Name must have at least 3 letters'),
      ).toBeInTheDocument();
      expect(screen.getByText('Invalid domain')).toBeInTheDocument();
    });
  });

  it('submits form successfully and displays derived email', async () => {
    const mockResponse = { email: 'johndoe@google.com' };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    } as any);

    render(componentWrapper(<EmailGuesserForm />));

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Company Domain'), {
      target: { value: 'google.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('The guessed email is:')).toBeInTheDocument();
      expect(screen.getByText('johndoe@google.com')).toBeInTheDocument();
    });
  });

  it('clears form when Clear button is clicked', () => {
    render(componentWrapper(<EmailGuesserForm />));

    const nameInput = screen.getByLabelText('Full Name');
    const domainInput = screen.getByLabelText('Company Domain');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(domainInput, { target: { value: 'babbel.com' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(domainInput).toHaveValue('babbel.com');

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(nameInput).toHaveValue('');
    expect(domainInput).toHaveValue('');
  });
});
