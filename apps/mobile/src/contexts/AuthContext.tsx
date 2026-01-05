import React, { createContext, useState, ReactNode, useContext } from 'react';
import { UserProfile } from '../modules/profile/profileService';
import { setToken as setTokenStore } from '../utils/tokenStore';

interface AuthContextProps {
  user: UserProfile | null;
  token: string | null;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (newToken: string, userProfile: UserProfile) => {
    setToken(newToken);
    setUser(userProfile);
    setTokenStore(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setTokenStore(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
