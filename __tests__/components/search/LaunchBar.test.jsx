import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LaunchBar } from '../../../components/search/LaunchBar';
import { sites } from '../../../lib/sites';

describe('LaunchBar', () => {
  beforeEach(() => {
    jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows the correct site count in the button label', () => {
    render(<LaunchBar />);
    expect(
      screen.getByRole('button', { name: /OPEN ALL 8 SEARCHES/i })
    ).toBeInTheDocument();
  });

  it('displays the tabs count stat', () => {
    render(<LaunchBar />);
    expect(screen.getByText('Tabs open')).toBeInTheDocument();
    expect(screen.getAllByText(String(sites.length))[0]).toBeInTheDocument();
  });

  it('opens a tab for every site when launch button is clicked', async () => {
    render(<LaunchBar />);
    await userEvent.click(screen.getByRole('button', { name: /OPEN ALL/i }));

    expect(window.open).toHaveBeenCalledTimes(sites.length);
    for (const site of sites) {
      expect(window.open).toHaveBeenCalledWith(
        site.url,
        '_blank',
        'noopener,noreferrer'
      );
    }
  });
});
