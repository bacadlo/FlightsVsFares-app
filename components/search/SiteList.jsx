'use client';

import { useEffect, useRef } from 'react';
import { sites } from '../../lib/sites';
import { SiteRow } from './SiteRow';
import '../../styles/sites.css';

export function SiteList() {
  const rowRefs = useRef([]);

  useEffect(() => {
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.animation = 'rowIn 0.45s ease both';
      }, 50 + i * 70);
    });
  }, []);

  return (
    <section className="sites-section">
      <div className="sites-section-header">
        <span className="sites-section-label">Search Targets</span>
        <span className="sites-section-rule" aria-hidden="true" />
      </div>

      <div className="site-list" role="list">
        {sites.map((site, i) => (
          <SiteRow
            key={site.name}
            site={site}
            index={i}
            rowRef={el => (rowRefs.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
}
