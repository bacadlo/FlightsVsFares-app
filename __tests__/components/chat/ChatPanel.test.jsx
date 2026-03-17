import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatPanel } from '../../../components/chat/ChatPanel';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: () => null })),
}));

describe('ChatPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    delete global.fetch;
  });

  describe('preview mode', () => {
    it('renders hardcoded preview messages', () => {
      render(<ChatPanel preview />);
      expect(screen.getByText(/Minneapolis to Nairobi/i)).toBeInTheDocument();
    });

    it('does not render the input form', () => {
      render(<ChatPanel preview />);
      expect(screen.queryByPlaceholderText(/Describe your trip/i)).not.toBeInTheDocument();
    });
  });

  describe('interactive mode', () => {
    it('renders the input and send button', () => {
      render(<ChatPanel />);
      expect(screen.getByPlaceholderText(/Describe your trip/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
    });

    it('send button is disabled when input is empty', () => {
      render(<ChatPanel />);
      expect(screen.getByRole('button', { name: /Send/i })).toBeDisabled();
    });

    it('send button enables when input has text', async () => {
      render(<ChatPanel />);
      await userEvent.type(screen.getByPlaceholderText(/Describe your trip/i), 'NYC to London');
      expect(screen.getByRole('button', { name: /Send/i })).toBeEnabled();
    });

    it('appends user message and AI reply on successful submit', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'Book 6 weeks out.' }),
      });

      render(<ChatPanel />);
      await userEvent.type(screen.getByPlaceholderText(/Describe your trip/i), 'NYC to London');
      await userEvent.click(screen.getByRole('button', { name: /Send/i }));

      expect(screen.getByText('NYC to London')).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.getByText('Book 6 weeks out.')).toBeInTheDocument()
      );
    });

    it('posts to /api/chat with the message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'reply' }),
      });

      render(<ChatPanel />);
      await userEvent.type(screen.getByPlaceholderText(/Describe your trip/i), 'test query');
      await userEvent.click(screen.getByRole('button', { name: /Send/i }));

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/chat',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ message: 'test query' }),
        })
      );
    });

    it('clears the input after submit', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'ok' }),
      });

      render(<ChatPanel />);
      const input = screen.getByPlaceholderText(/Describe your trip/i);
      await userEvent.type(input, 'some query');
      await userEvent.click(screen.getByRole('button', { name: /Send/i }));

      expect(input).toHaveValue('');
    });

    it('shows an error bubble when the fetch response is not ok', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });

      render(<ChatPanel />);
      await userEvent.type(screen.getByPlaceholderText(/Describe your trip/i), 'test');
      await userEvent.click(screen.getByRole('button', { name: /Send/i }));

      await waitFor(() =>
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      );
    });

    it('shows an error bubble when fetch rejects', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      render(<ChatPanel />);
      await userEvent.type(screen.getByPlaceholderText(/Describe your trip/i), 'test');
      await userEvent.click(screen.getByRole('button', { name: /Send/i }));

      await waitFor(() =>
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      );
    });

    it('does not submit whitespace-only input', async () => {
      render(<ChatPanel />);
      const input = screen.getByPlaceholderText(/Describe your trip/i);
      await userEvent.type(input, '   ');
      // send button stays disabled for whitespace
      expect(screen.getByRole('button', { name: /Send/i })).toBeDisabled();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('auto-submit from URL params', () => {
    it('submits automatically when search params are present', async () => {
      const { useSearchParams } = require('next/navigation');
      useSearchParams.mockReturnValue({
        get: (key) => ({ from: 'NYC', to: 'LAX', dates: 'Apr 14' })[key] ?? null,
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'auto reply' }),
      });

      render(<ChatPanel />);

      await waitFor(() =>
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/chat',
          expect.objectContaining({
            body: expect.stringContaining('NYC to LAX'),
          })
        )
      );
    });
  });
});
