import { jsx as _jsx } from "react/jsx-runtime";
// src/context/ThemeContext.tsx
import { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children, slideDirection = 'left', defaultMode = 'light', customStyles, debug = false }) => {
    // Get actual theme based on mode
    const getThemeFromMode = (currentMode) => {
        let result;
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
    const [mode, setMode] = useState(() => {
        if (typeof window === 'undefined')
            return defaultMode;
        const saved = localStorage.getItem('theme-mode');
        return saved || defaultMode;
    });
    // Initialize theme based on the loaded mode
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined')
            return 'light';
        const saved = localStorage.getItem('theme-mode');
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
        if (mode !== 'system')
            return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e) => {
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
        if (mode !== 'auto')
            return;
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
    return (_jsx(ThemeContext.Provider, { value: { theme, mode, setMode, slideDirection, customStyles }, children: _jsx("div", { className: `theme-root ${theme === 'dark' ? 'dark-mode' : ''}`, children: children }) }));
};
//# sourceMappingURL=ThemeContext.js.map