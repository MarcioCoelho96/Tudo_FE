// src/context/AuthContext.tsx
import { authService } from "@/services/authService";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await authService.getSessionToken();
        // If a secure token exists, authenticate the user immediately
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Failed to read secure token", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async () => {
    // You can pass an actual token here later from your API
    await authService.saveSessionToken("your-secure-jwt-token");
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.deleteSessionToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
