import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { AuthResponse, LoginData, RegisterData, LogoutData, ServerError, RefreshData } from '../model/types';

const apiClient = axios.create({
    baseURL: 'http://82.202.138.76:8080/api/v1'
});

export const registerUser = createAsyncThunk<AuthResponse, RegisterData, { rejectValue: ServerError }>(
    'auth/register',
    async (registerData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/register', registerData);
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as ServerError);
            }
            return rejectWithValue({ message: 'Произошла непредвиденная ошибка при регистрации' } as unknown as ServerError);
        }
    }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginData, { rejectValue: ServerError }>(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', loginData);
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as ServerError);
            }
            return rejectWithValue({ message: 'Произошла непредвиденная ошибка при входе' } as unknown as ServerError);
        }
    }
);

export const logoutUser = createAsyncThunk<{ message: string }, LogoutData, { rejectValue: ServerError }>(
    'auth/logout',
    async (logoutData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<{ message: string }>('/auth/logout', logoutData);
            console.log(response.data)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as ServerError);
            }
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return rejectWithValue({ message: 'Произошла непредвиденная ошибка при выходе' } as unknown as ServerError);
        }
    }
);

export const refreshToken = createAsyncThunk<AuthResponse, RefreshData, { rejectValue: ServerError }>(
    'auth/refresh',
    async (refreshData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/refresh', refreshData);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            return response.data;
        } catch (error) {
             if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as ServerError);
            }
            return rejectWithValue({ message: 'Не удалось обновить сессию' } as unknown as ServerError);
        }
    }
);