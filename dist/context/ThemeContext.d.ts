import React, { ReactNode } from 'react';
export type ThemeMode = 'light' | 'dark' | 'system' | 'auto';
export type SlideDirection = 'left' | 'right';
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
export declare const ThemeContext: React.Context<ThemeContextType | undefined>;
interface ThemeProviderProps {
    children: ReactNode;
    slideDirection?: SlideDirection;
    defaultMode?: ThemeMode;
    customStyles?: ThemeStyles;
    debug?: boolean;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map