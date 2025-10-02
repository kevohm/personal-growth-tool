// src/api/auth.ts
import { api, clearTokens, setTokens } from "../axios";

export interface AuthResponse {
    user: {
        id: string;
        email?: string;
        name: string;
        isGuest?: boolean;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export const setCurrentUserId = (userId: string) => {
    localStorage.setItem("currentUserId", userId);
};
export const getCurrentUserId = () => {
    return  localStorage.getItem("currentUserId");
};

export const clearCurrentUserId = () => {
    localStorage.removeItem("currentUserId");
};

export const signup = async (email: string, password: string, name: string) => {
    const response = await api.post<AuthResponse>("/auth/signup", {
        email,
        password,
        name,
    });
    setTokens(response.data.tokens);
    setCurrentUserId(response.data.user.id);
    return response.data.user;
};

export const login = async (email: string, password: string) => {
    const {data} = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
    });
    return data;
};

export const createGuest = async (name?: string) => {
    const response = await api.post<AuthResponse>("/auth/guest", { name });
    setTokens(response.data.tokens);
    setCurrentUserId(response.data.user.id);
    return response.data.user;
};

export const loginAsGuest = async (name?: string) => {
    const response = await api.post<AuthResponse>("/auth/login-guest", { name });
    setTokens(response.data.tokens);
    setCurrentUserId(response.data.user.id);
    return response.data.user;
};

export const logout = async () => {
    try {
        await api.post("/auth/logout");
    } catch {
        // ignore API errors on logout
    }
    clearTokens();
    clearCurrentUserId();
};

export const initUser = async () => {
    try {
        const response = await api.get(`/auth/me`);
        return response.data.user;
    } catch {
        clearCurrentUserId();
        clearTokens();
        return null;
    }
};

export const getCurrentUser = async () => {

    try {
        const response = await api.get(`/auth/me`);
        return response.data.user;
    }
    catch { return null; }
}