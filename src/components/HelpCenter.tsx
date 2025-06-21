
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, CreditCard, Shield, Wallet } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'Account Management',
      icon: Wallet,
      questions: [
        'How do I open a new sub-account?',
        'What is my 8-digit account number?',
        'How to transfer between accounts?',
        'Currency conversion rates'
      ]
    },
    {
      title: 'Payments & Cards',
      icon: CreditCard,
      questions: [
        'How to generate a virtual card?',
        'QR code payment process',
        'Request physical card delivery',
        'Card limits and restrictions'
      ]
    },
    {
      title: 'Security & Verification',
      icon: Shield,
      questions: [
        'Setting up 2FA authentication',
        'KYC document requirements',
        'Suspicious activity alerts',
        'Password reset process'
      ]
    },
    {
      title: 'Crypto & Trading',
      icon: Wallet,
      questions: [
        'Supported cryptocurrencies',
        'How to buy/sell crypto',
        'Wallet security best practices',
        'Transaction fees and limits'
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Help Center</h1>
            <p className="text-lg text-slate-600">
              Find answers to common questions about TowerFinance
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for help topics..."
                  className="pl-10 py-3 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {(searchQuery ? filteredCategories : faqCategories).map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <category.icon className="h-6 w-6 mr-3 text-blue-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <div 
                        key={qIndex}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                      >
                        <p className="text-sm font-medium text-slate-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {searchQuery && filteredCategories.length === 0 && (
            <Card className="mt-6">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any help topics matching "{searchQuery}"
                </p>
                <Button onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16">
                  <div className="text-center">
                    <p className="font-medium">Contact Support</p>
                    <p className="text-sm text-gray-600">Get help from our team</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-16">
                  <div className="text-center">
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">Chat with an agent</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-16">
                  <div className="text-center">
                    <p className="font-medium">Documentation</p>
                    <p className="text-sm text-gray-600">Read detailed guides</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
