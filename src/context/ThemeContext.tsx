// src/context/ThemeContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'auto';
export type SlideDirection = 'left' | 'right';

// ✅ Custom styling options
export interface ThemeStyles {
  buttonStyle?: React.CSSProperties;
  panelStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  activeColor?: string;
  borderRadius?: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  slideDirection: SlideDirection;
  customStyles?: ThemeStyles;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  slideDirection?: SlideDirection;
  defaultMode?: ThemeMode;
  customStyles?: ThemeStyles; // ✅ NEW: Custom styling support
  debug?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  slideDirection = 'left',
  defaultMode = 'light',
  customStyles,
  debug = false
}) => {
  // Get actual theme based on mode
  const getThemeFromMode = (currentMode: ThemeMode): 'light' | 'dark' => {
    let result: 'light' | 'dark';
    
    switch (currentMode) {
      case 'light':
        result = 'light';
        break;
      case 'dark':
        result = 'dark';
        break;
      case 'system':
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        result = systemPrefersDark ? 'dark' : 'light';
        
        if (debug) {
          console.log('🖥️ System Preference:', result);
        }
        break;
      case 'auto':
        const hour = new Date().getHours();
        result = (hour >= 6 && hour < 18) ? 'light' : 'dark';
        
        if (debug) {
          console.log('🕐 Auto Time (Hour:', hour, '):', result);
        }
        break;
      default:
        result = 'light';
    }
    
    return result;
  };

  // Initialize mode from localStorage
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    return saved || defaultMode;
  });

  // Initialize theme based on the loaded mode
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    const initialMode = saved || defaultMode;
    return getThemeFromMode(initialMode);
  });

  // Update theme when mode changes
  useEffect(() => {
    const newTheme = getThemeFromMode(mode);
    setTheme(newTheme);
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Listen to system preference changes (for 'system' mode)
  useEffect(() => {
    if (mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      if (debug) {
        console.log('🔄 System theme changed:', newTheme);
      }
      setTheme(newTheme);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode, debug]);

  // Auto mode - check every minute
  useEffect(() => {
    if (mode !== 'auto') return;

    const checkTime = () => {
      const hour = new Date().getHours();
      const newTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
      if (newTheme !== theme) {
        if (debug) {
          console.log('🕐 Auto theme changed:', newTheme);
        }
        setTheme(newTheme);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [mode, theme, debug]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, slideDirection, customStyles }}>
      <div className={`theme-root ${theme === 'dark' ? 'dark-mode' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};