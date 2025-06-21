
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DashboardLayout from '@/components/DashboardLayout';
import AdminPanel from '@/components/AdminPanel';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <AdminPanel />;
    }
    
    return <DashboardLayout />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TowerFinance</h3>
              <p className="text-slate-400 text-sm">
                Enterprise financial platform for modern businesses. 
                Secure, scalable, and compliant.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Multi-Currency Accounts</li>
                <li>QR Payments</li>
                <li>Virtual Cards</li>
                <li>API Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Departments</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Admin Panel</li>
                <li>Payment Management</li>
                <li>KYC Verification</li>
                <li>Security Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Support</li>
                <li>Status Page</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 TowerFinance Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
