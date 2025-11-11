import { ReactNode, useEffect } from 'react';
import { useTheme } from '@features/theme/lib/useTheme';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { theme } = useTheme();

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('app_dark_theme');
        } else {
            document.body.classList.remove('app_dark_theme');
        }
    }, [theme]);

    return <>{children}</>;
};