'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SkyControl } from './SkyControl';
import '../../styles/nav.css';

const NAV_TABS = [
  { href: '/',       label: 'Home',   abbr: 'H' },
  { href: '/search', label: 'Search', abbr: 'S' },
  { href: '/tips',   label: 'Tips',   abbr: 'T' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo" aria-label="FlightsVsFares home">
        Flights<span className="nav-logo-accent">Vs</span>Fares
      </Link>

      <div className="nav-tabs" role="navigation" aria-label="Main navigation">
        {NAV_TABS.map(({ href, label, abbr }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-tab${isActive ? ' nav-tab--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="nav-tab-label">{label}</span>
              <span className="nav-tab-abbr" aria-hidden="true">{abbr}</span>
            </Link>
          );
        })}
      </div>

      <div className="nav-right">
        <SkyControl />
      </div>
    </nav>
  );
}
