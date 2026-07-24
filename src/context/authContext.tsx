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
  logout: () => Promise<void>;
  login: (phoneNumber: string, validationCode: string) => Promise<void>;
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

        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Failed to read secure token", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [isAuthenticated]);

  const login = async (phoneNumber: string, validationCode: string) => {
    const token = await authService.validateSmsCode(
      phoneNumber,
      validationCode,
    );

    // const token =
    //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrMzUxOTY2MTUzMTc4IiwiaXNzIjoidHVkbyIsImF1ZCI6InR1ZG8iLCJpYXQiOjE3ODM3OTc3MTQsImV4cCI6MTc4Mzc5OTUxNH0.NNPSyv7m7efstSNK9LZ_-DEGqYnkiymlIGuWwyebBMU";

    await authService.saveSessionToken(token);

    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.deleteSessionToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
