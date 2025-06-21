
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Banknote, CreditCard, QrCode, Smartphone, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with 2FA, IP monitoring, and real-time fraud detection.'
    },
    {
      icon: Banknote,
      title: 'Multi-Currency Accounts',
      description: 'Manage USD, EUR, and crypto in separate sub-accounts with real-time conversion.'
    },
    {
      icon: CreditCard,
      title: 'Virtual & Physical Cards',
      description: 'Instant virtual cards and physical card delivery with global acceptance.'
    },
    {
      icon: QrCode,
      title: 'QR Payments',
      description: 'Send and receive payments instantly using QR codes with any currency.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Full-featured mobile experience with biometric authentication.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International transfers and currency exchange with competitive rates.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Everything You Need for Modern Finance
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built for enterprises that need secure, scalable, and compliant financial infrastructure.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
