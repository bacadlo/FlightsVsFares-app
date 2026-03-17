'use client';

import { useEffect, useRef } from 'react';

export function Stars() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 180; i++) {
      const star = document.createElement('div');
      const size = Math.random() > 0.5 ? 2 : 1;
      const x = Math.random() * 100;
      const y = Math.random() * 78;
      const duration = 2 + Math.random() * 5;
      const delay = Math.random() * 5;

      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: #fff;
        border-radius: 50%;
        animation: twinkle ${duration.toFixed(2)}s ease-in-out infinite ${delay.toFixed(2)}s;
      `;

      fragment.appendChild(star);
    }

    container.appendChild(fragment);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="stars" id="stars" />;
}
