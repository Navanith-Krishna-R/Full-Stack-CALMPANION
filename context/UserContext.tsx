'use client';
import { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface UserContextType {
  user: SessionUser | null;
  userEmail: string | null; // kept for pages that only need the email
  // Display-only convenience — every admin page/API independently
  // re-verifies the role server-side, so this can never be used to bypass
  // that check even if a client tampered with it.
  isAdmin: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userEmail: null,
  isAdmin: false,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Source of truth is the server session (httpOnly cookie), never
  // localStorage — a page can't fake being logged in by writing a value.
  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/me', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <UserContext.Provider
      value={{ user, userEmail: user?.email ?? null, isAdmin: user?.role === 'ADMIN', loading, refresh, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
