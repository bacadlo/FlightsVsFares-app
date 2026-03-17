'use client';

import { Stars } from './Stars';
import '../../styles/atmosphere.css';

export function Atmosphere() {
  return (
    <div className="atmosphere">
      <div className="sky-day" />
      <div className="sky-night" id="sky-night" />

      <div className="clouds" id="clouds">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
      </div>

      <Stars />

      <div className="horizon" id="horizon" />
      <div className="glow-blob" id="glow-blob" />
    </div>
  );
}
