//useTheme.ts
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/store';
import { themeActions } from '@features/theme/model/themeSlice';
import { useCallback } from 'react';

export const useTheme = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);

    const toggleTheme = useCallback(() => {
        dispatch(themeActions.toggleTheme());
    }, [dispatch]);

    return {
        theme,
        toggleTheme,
    };
};