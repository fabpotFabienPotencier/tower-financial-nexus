
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">TowerFinance</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-400"
              onClick={() => navigate('/help')}
            >
              Help Center
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-400"
              onClick={() => navigate('/login')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/register')}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
