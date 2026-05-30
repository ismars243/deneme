import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUser } from '../lib/mock-data';
import type { User } from '../lib/types';

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('finova_user').then(val => {
      if (val) setUser(JSON.parse(val));
      setLoading(false);
    });
  }, []);

  async function login(email: string, _password: string) {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...mockUser, email };
    setUser(u);
    await AsyncStorage.setItem('finova_user', JSON.stringify(u));
  }

  async function register(name: string, email: string, _password: string) {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...mockUser, name, email };
    setUser(u);
    await AsyncStorage.setItem('finova_user', JSON.stringify(u));
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem('finova_user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
