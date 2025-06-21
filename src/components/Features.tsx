
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  CreditCard, 
  Shield, 
  Users, 
  Banknote, 
  QrCode,
  Bell,
  FileText 
} from 'lucide-react';

const Features = () => {
  const featureCategories = [
    {
      title: "Account Management",
      icon: Wallet,
      features: [
        "8-digit random account numbers",
        "Multi-currency sub-accounts (USD, EUR, BTC)",
        "Internal transfers via account number or email",
        "Real-time balance tracking"
      ]
    },
    {
      title: "Payment Solutions",
      icon: CreditCard,
      features: [
        "Virtual card generation with CVV",
        "Physical card request system",
        "QR code payment generation & scanning",
        "Currency conversion engine"
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      features: [
        "JWT + TOTP 2FA authentication",
        "IP and country detection",
        "KYC document verification",
        "Fraud monitoring and alerts"
      ]
    },
    {
      title: "Department Tools",
      icon: Users,
      features: [
        "Admin: Full platform control",
        "Payment: Fund management & FX rates",
        "KYC: Document verification",
        "Security: Activity monitoring"
      ]
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Financial Infrastructure
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to run a modern financial operation, from user accounts 
            to department management and regulatory compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featureCategories.map((category, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <category.icon className="h-6 w-6 text-blue-600" />
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Enterprise-Ready Technology Stack
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-slate-900 mb-3">Backend</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Express/NestJS</Badge>
                <Badge variant="secondary">PostgreSQL</Badge>
                <Badge variant="secondary">JWT + TOTP</Badge>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-slate-900 mb-3">Frontend</h4>
              <div className="space-y-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Responsive Design</Badge>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-slate-900 mb-3">Infrastructure</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Docker</Badge>
                <Badge variant="secondary">Ubuntu Server</Badge>
                <Badge variant="secondary">CoinGecko API</Badge>
                <Badge variant="secondary">QR Code Generation</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
