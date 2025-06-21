
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-16 w-16 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold">TowerFinance</h1>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Enterprise Financial
            <span className="text-blue-400 block">Platform</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Secure multi-currency accounts, instant payments, virtual cards, and comprehensive 
            administrative tools for modern financial operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
              onClick={() => navigate('/register')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-300 text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-300">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-300">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">256-bit</div>
              <div className="text-slate-300">Encryption</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
