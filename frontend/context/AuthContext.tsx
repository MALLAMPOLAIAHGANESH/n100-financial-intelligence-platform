"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/api";

interface User {
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: str) => Promise<void>;
  register: (email: string, password: str) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("user_email");
    if (savedToken) {
      setToken(savedToken);
      setUser({ email: savedEmail || "user@financel.com" });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: str) => {
    const data = await authApi.login(email, password);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_email", email);
      setToken(data.access_token);
      setUser({ email });
    }
  };

  const register = async (email: string, password: str) => {
    const data = await authApi.register(email, password);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_email", email);
      setToken(data.access_token);
      setUser({ email });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
