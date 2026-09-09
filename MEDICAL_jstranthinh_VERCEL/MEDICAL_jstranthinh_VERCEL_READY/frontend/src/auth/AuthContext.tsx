import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { api } from "../lib/api";
import type { ApiResponse, CurrentUser } from "../types/api";
import {
  clearAuthToken,
  getAuthToken,
  SESSION_EXPIRED_EVENT,
  setAuthToken,
} from "./token";

type LoginInput = { email: string; password: string };
type RegisterInput = LoginInput & {
  fullName: string;
  phone: string;
  dateOfBirth?: string;
};

interface AuthContextValue {
  user: CurrentUser | null;
  initializing: boolean;
  login: (input: LoginInput) => Promise<CurrentUser>;
  register: (input: RegisterInput) => Promise<CurrentUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  const refreshUser = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      return;
    }

    const response = await api.get<ApiResponse<CurrentUser>>("/auth/me");
    setUser(response.data.data);
  };

  useEffect(() => {
    void refreshUser()
      .catch(() => {
        clearAuthToken();
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  useEffect(() => {
    const handleExpiredSession = () => {
      clearAuthToken();
      setUser(null);
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpiredSession);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpiredSession);
  }, []);

  const login = async (input: LoginInput) => {
    const response = await api.post<
      ApiResponse<{ token: string; user: CurrentUser }>
    >("/auth/login", input);

    setAuthToken(response.data.data.token);
    setUser(response.data.data.user);
    return response.data.data.user;
  };

  const register = async (input: RegisterInput) => {
    const response = await api.post<
      ApiResponse<{ token: string; user: CurrentUser }>
    >("/auth/register", input);

    setAuthToken(response.data.data.token);
    setUser(response.data.data.user);
    return response.data.data.user;
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, initializing, login, register, logout, refreshUser }),
    [user, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
