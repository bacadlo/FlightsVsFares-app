import { render, screen } from '@testing-library/react';
import { EyebrowLabel } from '../../../components/ui/EyebrowLabel';

describe('EyebrowLabel', () => {
  it('renders children', () => {
    render(<EyebrowLabel>AI-Powered</EyebrowLabel>);
    expect(screen.getByText('AI-Powered')).toBeInTheDocument();
  });

  it('renders a span element', () => {
    const { container } = render(<EyebrowLabel>Label</EyebrowLabel>);
    expect(container.firstChild.tagName).toBe('SPAN');
  });

  it('applies the eyebrow-label class', () => {
    const { container } = render(<EyebrowLabel>Label</EyebrowLabel>);
    expect(container.firstChild).toHaveClass('eyebrow-label');
  });
});
