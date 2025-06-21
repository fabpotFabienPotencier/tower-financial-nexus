
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'payment' | 'kyc' | 'security';
  accountNumber: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, totpCode?: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string, totpCode?: string): Promise<boolean> => {
    // Simulate authentication
    console.log('Authenticating user:', email);
    
    // Mock user data based on email
    let mockUser: User;
    if (email === 'admin@towerfinance.com') {
      mockUser = {
        id: '1',
        email,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        accountNumber: '12345678'
      };
    } else {
      mockUser = {
        id: '2',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        accountNumber: Math.floor(10000000 + Math.random() * 90000000).toString()
      };
    }

    setUser(mockUser);
    toast({
      title: "Login Successful",
      description: `Welcome back, ${mockUser.firstName}!`,
    });
    
    navigate('/');
    return true;
  };

  const register = async (userData: any): Promise<boolean> => {
    console.log('Registering user:', userData);
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'user',
      accountNumber: Math.floor(10000000 + Math.random() * 90000000).toString()
    };

    setUser(newUser);
    toast({
      title: "Registration Successful",
      description: `Welcome to TowerFinance, ${newUser.firstName}!`,
    });
    
    navigate('/');
    return true;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
