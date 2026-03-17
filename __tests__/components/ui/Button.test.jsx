import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../../components/ui/Button';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Button', () => {
  it('renders an anchor when href is provided', () => {
    render(<Button href="/search">Search</Button>);
    const el = screen.getByRole('link', { name: 'Search' });
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('href', '/search');
  });

  it('renders a button element when href is omitted', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies the primary class by default', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--primary');
  });

  it('applies the ghost class when variant="ghost"', () => {
    render(<Button variant="ghost">Tips</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--ghost');
  });

  it('always applies the base btn class', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn');
  });

  it('fires onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
