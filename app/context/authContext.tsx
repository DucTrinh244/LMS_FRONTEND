// app/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  role: "student" | "instructor" | "admin";
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: () => {},
  logout: () => {},
  refreshAccessToken: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const login = (userData: User, access: string, refresh: string) => {
    setUser(userData);
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Load token từ localStorage khi app load
  useEffect(() => {
    const savedAccess = localStorage.getItem("accessToken");
    const savedRefresh = localStorage.getItem("refreshToken");
    if (savedAccess && savedRefresh) {
      setAccessToken(savedAccess);
      setRefreshToken(savedRefresh);
      // TODO: gọi API lấy user info từ accessToken
    }
  }, []);

  const refreshAccessToken = async () => {
    if (!refreshToken) return;
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    } catch (err) {
      console.error("Cannot refresh token", err);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
