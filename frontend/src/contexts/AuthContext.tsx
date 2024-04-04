import React, { createContext, useContext, useEffect, useState } from "react";
import { LogInInputType, User } from "../types";
import { signIn } from "../apiCalls/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (values: LogInInputType) => void;
  logout: () => void;
  getJWT: () => string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  getJWT: () => null,
  user: null,
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        setIsAuthenticated(!!token);
        setUser(JSON.parse(storedUser));
      }
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
    setIsLoading(false);
  }, []);

  const login = async (values: LogInInputType) => {
    setIsLoading(true);

    const res = await signIn(values.username);
    if (res) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      setIsAuthenticated(true);
    } else {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const getJWT = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, isLoading, getJWT, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
