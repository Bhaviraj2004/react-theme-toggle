// src/components/ThemeToggle.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

if (typeof document !== 'undefined') {
  import('../styles/theme.css');
}

// Custom SVG Icons
const Icons = {
  Monitor: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Sun: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Moon: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Clock: ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

interface ThemeOption {
  mode: 'system' | 'light' | 'dark' | 'auto';
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
}

const themeOptions: ThemeOption[] = [
  { mode: 'system', Icon: Icons.Monitor, label: 'System' },
  { mode: 'light', Icon: Icons.Sun, label: 'Light' },
  { mode: 'dark', Icon: Icons.Moon, label: 'Dark' },
  { mode: 'auto', Icon: Icons.Clock, label: 'Auto' },
];

export const ThemeToggle: React.FC = () => {
  const { theme, mode, setMode, slideDirection, customStyles } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const selectedOption = themeOptions.find((opt) => opt.mode === mode) || themeOptions[1];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Circle expand animation trigger
  const triggerCircleAnimation = (newTheme: 'light' | 'dark') => {
    if (animating) return;
    setAnimating(true);

    const button = toggleRef.current?.querySelector('.theme-toggle-selected');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const circle = document.createElement('div');
    circle.className = 'theme-circle-overlay';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.background = newTheme === 'dark' ? '#0f172a' : '#ffffff';

    document.body.appendChild(circle);

    requestAnimationFrame(() => {
      circle.classList.add('expanding');
    });

    setTimeout(() => {
      circle.remove();
      setAnimating(false);
    }, 800);
  };

  const handleModeChange = (newMode: typeof mode) => {
    const oldTheme = theme;
    setMode(newMode);
    setIsOpen(false);

    let newTheme: 'light' | 'dark' = 'light';

    if (newMode === 'dark') newTheme = 'dark';
    else if (newMode === 'light') newTheme = 'light';
    else if (newMode === 'system') {
      newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else if (newMode === 'auto') {
      const hour = new Date().getHours();
      newTheme = hour >= 6 && hour < 18 ? 'light' : 'dark';
    }

    if (oldTheme !== newTheme) {
      triggerCircleAnimation(newTheme);
    }
  };

  const SelectedIcon = selectedOption.Icon;

  // ✅ Merge custom styles
  const buttonStyle = {
    ...customStyles?.buttonStyle,
    borderRadius: customStyles?.borderRadius || undefined,
  };

  const panelStyle = {
    ...customStyles?.panelStyle,
    borderRadius: customStyles?.borderRadius || undefined,
  };

  const optionStyle = {
    ...customStyles?.optionStyle,
    borderRadius: customStyles?.borderRadius || undefined,
  };

  return (
    <div
      ref={toggleRef}
      className={`theme-toggle-container ${isOpen ? 'open' : ''}`}
      data-direction={slideDirection}
    >
      {/* Selected Button */}
      <button
        className="theme-toggle-selected"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme menu"
        title={selectedOption.label}
        style={buttonStyle} // ✅ Apply custom styles
      >
        <span className="theme-icon">
          <SelectedIcon size={18} />
        </span>
      </button>

      {/* Expanded Options */}
      {isOpen && (
        <div 
          className={`theme-options-panel slide-${slideDirection}`}
          style={panelStyle} // ✅ Apply custom styles
        >
          {themeOptions.map((option) => {
            const Icon = option.Icon;
            const isActive = mode === option.mode;
            
            return (
              <button
                key={option.mode}
                className={`theme-option-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleModeChange(option.mode)}
                title={option.label}
                disabled={isActive}
                style={{
                  ...optionStyle,
                  background: isActive && customStyles?.activeColor 
                    ? customStyles.activeColor 
                    : undefined,
                }} // ✅ Apply custom active color
              >
                <span className="theme-icon">
                  <Icon size={18} />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};