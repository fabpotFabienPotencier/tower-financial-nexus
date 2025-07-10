
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session?.user) {
        setLoading(true);
        const profileLoaded = await fetchUserProfile(session.user);
        if (profileLoaded) {
          navigate('/dashboard');
        } else {
          console.log('Profile failed to load, signing out user');
          toast({
            title: "Profile Error", 
            description: "Could not load your profile. Please try logging in again.",
            variant: "destructive"
          });
          await supabase.auth.signOut();
        }
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/');
      }
      
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Fetching profile for user:', supabaseUser.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        // Don't show error toast immediately, try to create profile first
        return false;
      }

      if (!profile) {
        console.log('No profile found, user might need to refresh');
        // Profile doesn't exist yet, this can happen during signup
        return false;
      }

      console.log('Profile loaded successfully:', profile);
      setUser({
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: profile.role as 'user' | 'admin' | 'payment' | 'kyc' | 'security',
        accountNumber: profile.account_number
      });
      
      return true;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        // The redirect will happen in the auth state change listener
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      if (data.user) {
        toast({
          title: "Registration Successful",
          description: `Welcome to TowerFinance! Please check your email to verify your account.`,
        });
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
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
