'use client';

import { sites } from '../../lib/sites';
import '../../styles/launch-bar.css';

export function LaunchBar() {
  function launchAll() {
    sites.forEach(site => {
      window.open(site.url, '_blank', 'noopener,noreferrer');
    });
  }

  return (
    <div className="launch-bar">
      <button className="launch-btn" onClick={launchAll}>
        OPEN ALL {sites.length} SEARCHES SIMULTANEOUSLY →
      </button>

      <div className="launch-info">
        <div className="launch-stat">
          <span className="launch-stat-num">{sites.length}</span>
          <span className="launch-stat-label">Tabs open</span>
        </div>
        <div className="launch-stat-divider" aria-hidden="true" />
        <div className="launch-stat">
          <span className="launch-stat-num">0</span>
          <span className="launch-stat-label">Selected</span>
        </div>
      </div>
    </div>
  );
}
