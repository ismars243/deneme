import { createContext, useContext, useState } from 'react';
import type { User } from '../lib/types';
import { mockUser } from '../lib/mock-data';

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, _password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  register: (name: string, email: string, _password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('finova-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  function persist(u: User | null) {
    setUser(u);
    if (u) localStorage.setItem('finova-user', JSON.stringify(u));
    else localStorage.removeItem('finova-user');
  }

  async function login(email: string, _password: string) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    persist({ ...mockUser, email });
    setLoading(false);
  }

  async function loginGoogle() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    persist(mockUser);
    setLoading(false);
  }

  async function register(name: string, email: string, _password: string) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    persist({ ...mockUser, name, email, id: crypto.randomUUID() });
    setLoading(false);
  }

  function logout() { persist(null); }

  function updateUser(updates: Partial<User>) {
    if (!user) return;
    persist({ ...user, ...updates });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginGoogle, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
