//authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse} from './types';
import { registerUser, loginUser, logoutUser, refreshToken } from '../api/authThunks';

const translateAuthError = (serverError: any): string => {
    if (!serverError || typeof serverError !== 'object') {
        return 'Произошла неизвестная ошибка';
    }

    const errorMessage = serverError.message || serverError.detail || Object.values(serverError).join(', ');

    switch (errorMessage) {
        case 'invalid credentials':
            return 'Неверный логин или пароль';
        case 'user already exists':
            return 'Пользователь с таким email уже существует';
        default:
            return errorMessage; 
    }
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                console.log('Ответ от сервера при регистрации:', action.payload);
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                if (action.payload) {
                    state.error = translateAuthError(action.payload);
                } else {
                    state.error = action.error.message || 'Произошла ошибка регистрации';
                }
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                console.log('Ответ от сервера при входе:', action.payload);
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                if (action.payload) {
                    state.error = translateAuthError(action.payload);
                } else {
                    state.error = action.error.message || 'Произошла ошибка входа';
                }
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.isLoading = false;
                state.error = null;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.isLoading = false;
                if (action.payload) {
                    state.error = Object.values(action.payload).join(', ');
                } else {
                    state.error = action.error.message || 'Произошла ошибка выхода';
                }
            })
            
             .addCase(refreshToken.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
            })

            .addCase(refreshToken.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            });
    },
});

export const { clearError } = authSlice.actions;
export const { reducer: authReducer } = authSlice; 