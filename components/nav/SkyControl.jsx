'use client';

import { useSkyThemeContext } from '../../contexts/SkyThemeContext';

const MODES = [
  { id: 'auto',  label: '🔀', title: 'Auto cycle' },
  { id: 'day',   label: '☀️', title: 'Day mode'   },
  { id: 'night', label: '🌙', title: 'Night mode'  },
];

export function SkyControl() {
  const { mode, setSkyMode } = useSkyThemeContext();

  return (
    <div className="sky-control">
      {MODES.map(({ id, label, title }) => (
        <button
          key={id}
          className="sky-btn"
          aria-label={title}
          aria-pressed={mode === id}
          onClick={() => setSkyMode(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
