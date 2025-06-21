
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, Mail, Lock, Smartphone } from 'lucide-react';

const LoginForm = () => {
  const [step, setStep] = useState(1); // 1: credentials, 2: 2FA
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totpCode: ''
  });
  const [ipInfo, setIpInfo] = useState({
    ip: '192.168.1.1',
    country: 'United States',
    city: 'New York'
  });

  const handleLogin = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle successful login
      console.log('Login successful');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold">TowerFinance</span>
          </div>
          <CardTitle>
            {step === 1 ? 'Sign In' : 'Two-Factor Authentication'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totp">Authentication Code</Label>
                <Input
                  id="totp"
                  type="text"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  value={formData.totpCode}
                  onChange={(e) => setFormData({...formData, totpCode: e.target.value})}
                />
              </div>
            </>
          )}

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Login detected from {ipInfo.ip} ({ipInfo.city}, {ipInfo.country})
            </AlertDescription>
          </Alert>

          <Button 
            onClick={handleLogin}
            className="w-full"
            disabled={step === 1 ? !formData.email || !formData.password : !formData.totpCode}
          >
            {step === 1 ? 'Continue' : 'Sign In'}
          </Button>

          {step === 2 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="w-full"
            >
              Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
