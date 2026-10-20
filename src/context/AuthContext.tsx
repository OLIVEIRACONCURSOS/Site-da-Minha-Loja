import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { db } from '../services/database';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, senhaHash?: string) => Promise<{ success: boolean; error?: string }>;
  register: (nome: string, email: string, telefone: string, senhaHash: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  recoverPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'oliveira_current_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const login = async (email: string, senhaHash?: string): Promise<{ success: boolean; error?: string }> => {
    const users = db.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!found) {
      return { success: false, error: 'E-mail não encontrado na plataforma.' };
    }

    if (found.status === 'bloqueado') {
      return { success: false, error: 'Esta conta encontra-se bloqueada. Entre em contato com o suporte.' };
    }

    setUser(found);
    return { success: true };
  };

  const register = async (nome: string, email: string, telefone: string, senhaHash: string): Promise<{ success: boolean; error?: string }> => {
    const users = db.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return { success: false, error: 'Este e-mail já está cadastrado na Oliveira Concursos.' };
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      nome,
      email,
      telefone,
      senhaHash,
      role: 'aluno',
      status: 'ativo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    db.saveUsers(users);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const recoverPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const users = db.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, message: 'E-mail não localizado em nossa base de alunos.' };
    }
    return { success: true, message: 'Instruções de recuperação enviadas para o seu e-mail cadastrado.' };
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
    setUser(updated);
    const users = db.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = updated;
      db.saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        recoverPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
