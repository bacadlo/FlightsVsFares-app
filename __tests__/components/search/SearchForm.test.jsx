import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from '../../../components/search/SearchForm';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

describe('SearchForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders all four fields', () => {
    render(<SearchForm />);
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Dates')).toBeInTheDocument();
    expect(screen.getByLabelText('Passengers')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<SearchForm />);
    expect(screen.getByRole('button', { name: 'SEARCH' })).toBeInTheDocument();
  });

  it('pre-fills fields from initialValues', () => {
    render(<SearchForm initialValues={{ from: 'New York', to: 'London' }} />);
    expect(screen.getByLabelText('From')).toHaveValue('New York');
    expect(screen.getByLabelText('To')).toHaveValue('London');
  });

  it('updates input value on change', async () => {
    render(<SearchForm />);
    await userEvent.type(screen.getByLabelText('From'), 'Paris');
    expect(screen.getByLabelText('From')).toHaveValue('Paris');
  });

  it('calls router.push with filled params on submit', async () => {
    render(<SearchForm />);
    await userEvent.type(screen.getByLabelText('From'), 'NYC');
    await userEvent.type(screen.getByLabelText('To'), 'LAX');
    await userEvent.click(screen.getByRole('button', { name: 'SEARCH' }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    const url = mockPush.mock.calls[0][0];
    expect(url).toContain('from=NYC');
    expect(url).toContain('to=LAX');
  });

  it('omits empty fields from the search params', async () => {
    render(<SearchForm />);
    await userEvent.type(screen.getByLabelText('From'), 'Boston');
    await userEvent.click(screen.getByRole('button', { name: 'SEARCH' }));

    const url = mockPush.mock.calls[0][0];
    expect(url).toContain('from=Boston');
    expect(url).not.toContain('to=');
    expect(url).not.toContain('dates=');
  });

  it('passengers field has type number', () => {
    render(<SearchForm />);
    expect(screen.getByLabelText('Passengers')).toHaveAttribute('type', 'number');
  });
});
