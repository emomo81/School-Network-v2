import { useState, useEffect } from "react";
import { User, Department } from "@/lib/types";
import { mockAuth } from "@/lib/mockApi";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockAuth.login(email, password);
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    department: Department,
    year: 1 | 2 | 3 | 4
  ) => {
    setIsLoading(true);
    try {
      const user = await mockAuth.signup(email, password, name, department, year);
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    mockAuth.logout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };
}
