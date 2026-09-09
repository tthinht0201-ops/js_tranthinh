import axios from "axios";

import {
  clearAuthToken,
  getAuthToken,
  SESSION_EXPIRED_EVENT,
} from "../auth/token";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL = (
  configuredApiUrl || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api")
).replace(/\/$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAuthToken();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }

    return Promise.reject(error);
  },
);

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;

    if (!error.response) {
      return "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối hoặc cấu hình API.";
    }

    return data?.message ?? "Yêu cầu không thể được xử lý";
  }

  return error instanceof Error ? error.message : "Đã xảy ra lỗi";
};
