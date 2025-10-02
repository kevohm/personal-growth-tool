// src/api/axiosInstance.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export const baseUrl = import.meta.env.VITE_BASE_URL as string;
// console.log("BASE: ", baseUrl)

// Save tokens in localStorage (or secure storage if available)
export const getTokens = (): AuthTokens | null => {
  const data = localStorage.getItem("authTokens");
  return data ? JSON.parse(data) : null;
};

export const setTokens = (tokens: AuthTokens) => {
  localStorage.setItem("authTokens", JSON.stringify(tokens));
};

export const clearTokens = () => {
  localStorage.removeItem("authTokens");
};

// Create Axios instanceexport
export const api = axios.create({
  baseURL: baseUrl, // update with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach access token
api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// Response interceptor → handle expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Normalize backend error responses
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // prevent infinite loop

      const tokens = getTokens();
      if (tokens?.refreshToken) {
        try {
          const refreshResponse = await axios.post<{ accessToken: string; refreshToken: string }>(
            `${baseUrl}/auth/refresh`,
            { refreshToken: tokens.refreshToken }
          );

          const newTokens = refreshResponse.data;
          setTokens(newTokens);

          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          clearTokens();
          window.location.href = "/auth";
        }
      }
    }

    return Promise.reject(error);
  }
);



