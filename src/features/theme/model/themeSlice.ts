//themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
}

const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
};

const initialState: ThemeState = {
    theme: getInitialTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const { actions: themeActions } = themeSlice;
export const { reducer: themeReducer } = themeSlice;