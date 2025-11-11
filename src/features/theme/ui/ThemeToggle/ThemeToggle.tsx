//ThemeToggle.tsx
import { useTheme } from '@features/theme/lib/useTheme';
import { memo } from 'react';
import styles from './ThemeToggle.module.css';

const SunIcon = () => <svg /* ... */ >...</svg>;
const MoonIcon = () => <svg /* ... */ >...</svg>;

export const ThemeSwitcher = memo(() => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={styles.button} onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'} 
        </button>
    );
});