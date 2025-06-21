
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CreditCard, QrCode, Users } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "2FA authentication, IP monitoring, and fraud detection"
    },
    {
      icon: CreditCard,
      title: "Multi-Currency Accounts",
      description: "USD, EUR, BTC and more with instant conversion"
    },
    {
      icon: QrCode,
      title: "QR Payments",
      description: "Generate and scan QR codes for instant transfers"
    },
    {
      icon: Users,
      title: "Department Management",
      description: "Dedicated tools for Admin, Payment, KYC, and Security teams"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Enterprise Financial Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Complete financial infrastructure with multi-currency accounts, advanced security,
            and department-specific management tools for modern businesses.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
