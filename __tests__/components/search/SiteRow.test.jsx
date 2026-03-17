import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteRow } from '../../../components/search/SiteRow';

const site = {
  name: 'Google Flights',
  desc: 'Best for flexible date price calendars',
  badge: 'Price Calendar',
  url: 'https://www.google.com/flights',
};

describe('SiteRow', () => {
  beforeEach(() => {
    jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the site name', () => {
    render(<SiteRow site={site} index={0} rowRef={null} />);
    expect(screen.getByText('Google Flights')).toBeInTheDocument();
  });

  it('renders the site description', () => {
    render(<SiteRow site={site} index={0} rowRef={null} />);
    expect(screen.getByText(site.desc)).toBeInTheDocument();
  });

  it('renders the badge', () => {
    render(<SiteRow site={site} index={0} rowRef={null} />);
    expect(screen.getByText('Price Calendar')).toBeInTheDocument();
  });

  it('renders a 1-based padded number', () => {
    render(<SiteRow site={site} index={2} rowRef={null} />);
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('open button has a descriptive aria-label', () => {
    render(<SiteRow site={site} index={0} rowRef={null} />);
    expect(screen.getByRole('button', { name: 'Open Google Flights' })).toBeInTheDocument();
  });

  it('calls window.open with the site url on button click', async () => {
    render(<SiteRow site={site} index={0} rowRef={null} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open Google Flights' }));
    expect(window.open).toHaveBeenCalledWith(
      'https://www.google.com/flights',
      '_blank',
      'noopener,noreferrer'
    );
  });
});
