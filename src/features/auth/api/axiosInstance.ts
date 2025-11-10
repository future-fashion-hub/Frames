import axios from 'axios';
import { refreshToken } from '@/features/auth/api/authThunks';
import { store } from '@/app/providers/StoreProvider/store'; 

const apiClient = axios.create({
    baseURL: 'http://82.202.138.76:8080/api/v1',
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const refreshTokenValue = localStorage.getItem('refreshToken');

        if (error.response.status === 401 && refreshTokenValue && !originalRequest._retry) {
            originalRequest._retry = true; // Помечаем запрос как повторный

            try {
                const resultAction = await store.dispatch(refreshToken({ refresh_token: refreshTokenValue }));
                
                if (refreshToken.fulfilled.match(resultAction)) {
                    const newAccessToken = resultAction.payload.access_token;
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                } else {
                    store.dispatch({ type: 'auth/logout/fulfilled' }); 
                    window.location.href = '/login'; 
                    return Promise.reject(resultAction.payload);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;