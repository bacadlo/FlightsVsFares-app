'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useSkyTheme() {
  const [mode, setMode] = useState('auto');
  const intervalRef = useRef(null);
  const tRef = useRef(0);
  const elCacheRef = useRef(null);
  const themeRef = useRef('day');

  // Cache element references on first access — avoids repeated getElementById in the 50ms hot path
  const getEls = useCallback(() => {
    if (!elCacheRef.current) {
      elCacheRef.current = {
        skyNight: document.getElementById('sky-night'),
        stars:    document.getElementById('stars'),
        clouds:   document.getElementById('clouds'),
      };
    }
    return elCacheRef.current;
  }, []);

  const setTransitions = useCallback((value) => {
    const els = getEls();
    Object.values(els).forEach((el) => {
      if (el) el.style.transition = value;
    });
  }, [getEls]);

  const clearAutoInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const applyNightFactor = useCallback((factor) => {
    const { skyNight, stars, clouds } = getEls();

    if (skyNight) skyNight.style.opacity = factor;
    if (stars)    stars.style.opacity    = factor;
    if (clouds)   clouds.style.opacity   = 1 - (factor * 0.92);

    // Only write data-theme when crossing the day/night threshold
    const newTheme = factor > 0.5 ? 'night' : 'day';
    if (newTheme !== themeRef.current) {
      themeRef.current = newTheme;
      document.documentElement.dataset.theme = newTheme;
    }
  }, [getEls]);

  const startAutoInterval = useCallback(() => {
    clearAutoInterval();
    setTransitions('none');
    intervalRef.current = setInterval(() => {
      tRef.current += 0.005;
      applyNightFactor((Math.sin(tRef.current) + 1) / 2);
    }, 50);
  }, [clearAutoInterval, setTransitions, applyNightFactor]);

  const setSkyMode = useCallback((newMode) => {
    setMode(newMode);
    clearAutoInterval();

    if (newMode === 'auto') {
      startAutoInterval();
      return;
    }

    setTransitions('opacity 3s ease');
    applyNightFactor(newMode === 'night' ? 1 : 0);
  }, [clearAutoInterval, startAutoInterval, setTransitions, applyNightFactor]);

  useEffect(() => {
    startAutoInterval();
    return clearAutoInterval;
  }, [startAutoInterval, clearAutoInterval]);

  return { mode, setSkyMode };
}
