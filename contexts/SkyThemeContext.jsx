'use client';

import { createContext, useContext } from 'react';
import { useSkyTheme } from '../hooks/useSkyTheme';

export const SkyThemeContext = createContext(null);

export function SkyThemeProvider({ children }) {
  const skyTheme = useSkyTheme();

  return (
    <SkyThemeContext.Provider value={skyTheme}>
      {children}
    </SkyThemeContext.Provider>
  );
}

export function useSkyThemeContext() {
  const ctx = useContext(SkyThemeContext);
  if (!ctx) throw new Error('useSkyThemeContext must be used within SkyThemeProvider');
  return ctx;
}
