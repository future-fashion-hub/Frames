export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface RegisterData {
    login: string;
    username: string;
    password: string; 
}

export interface LoginData {
    login: string;
    password: string;
}

export interface LogoutData {
    refresh_token: string;
}

export interface AuthResponse {
    access_token: string;
    message: string;
    refresh_token: string;
}

export interface ServerError {
    [key: string]: any; 
    message?: string;   
}

export interface RefreshData {
    refresh_token: string;
}