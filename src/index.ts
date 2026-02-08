// src/index.ts

export { ThemeProvider } from './context/ThemeContext';
export { ThemeToggle } from './components/ThemeToggle';
export { useTheme } from './hooks/useTheme';

export type { 
  ThemeMode, 
  SlideDirection, 
  ThemeStyles,
  ThemeContextType 
} from './context/ThemeContext';