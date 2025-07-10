
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const VirtualCards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      number: '4532-1234-5678-8976',
      expiry: '12/26',
      cvv: '123',
      balance: 1000,
      status: 'active'
    }
  ]);

  const [physicalCardRequest, setPhysicalCardRequest] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const generateCard = () => {
    const newCard = {
      id: cards.length + 1,
      number: `4532-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      expiry: '12/27',
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      balance: 0,
      status: 'active'
    };
    setCards([...cards, newCard]);
  };

  const requestPhysicalCard = () => {
    console.log('Physical card request:', physicalCardRequest);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div key={card.id} className="liquid-float" style={{ animationDelay: `${index * 0.1}s` }}>
            <Card className="neo-floating liquid-morph border-0 bg-gradient-to-br from-slate-800 via-slate-900 to-primary-dark text-white overflow-hidden relative">
              <div className="liquid-wave"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <Badge className="neo-inset bg-gradient-to-r from-primary to-primary-glow border-0 text-white">
                    Virtual Card
                  </Badge>
                  <div className="neo-raised p-2 rounded-xl bg-white/10">
                    <CreditCard className="h-8 w-8" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-3xl font-mono tracking-wider gradient-text">{card.number}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="neo-inset p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-300 mb-1">VALID THRU</p>
                      <p className="text-lg font-mono">{card.expiry}</p>
                    </div>
                    <div className="neo-inset p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-300 mb-1">CVV</p>
                      <p className="text-lg font-mono">{card.cvv}</p>
                    </div>
                    <div className="neo-inset p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-300 mb-1">BALANCE</p>
                      <p className="text-xl font-bold gradient-text">${card.balance}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="neo-raised liquid-morph border-0 bg-gradient-to-br from-card to-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="neo-inset p-2 rounded-xl">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <span className="gradient-text">Generate Virtual Card</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="neo-inset p-6 rounded-2xl text-center">
              <div className="neo-raised p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary-glow/10 inline-block mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create a new virtual card for online payments and transactions.
              </p>
            </div>
            <Button 
              onClick={generateCard} 
              className="w-full neo-raised border-0 bg-gradient-to-r from-primary to-primary-glow liquid-morph"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Generate New Card
            </Button>
          </CardContent>
        </Card>

        <Card className="neo-raised liquid-morph border-0 bg-gradient-to-br from-card to-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="neo-inset p-2 rounded-xl">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <span className="gradient-text">Request Physical Card</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-sm font-medium">Address</Label>
              <Input
                id="address"
                value={physicalCardRequest.address}
                onChange={(e) => setPhysicalCardRequest({...physicalCardRequest, address: e.target.value})}
                className="neo-inset border-0 bg-transparent mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-medium">City</Label>
                <Input
                  id="city"
                  value={physicalCardRequest.city}
                  onChange={(e) => setPhysicalCardRequest({...physicalCardRequest, city: e.target.value})}
                  className="neo-inset border-0 bg-transparent mt-2"
                />
              </div>
              <div>
                <Label htmlFor="zip" className="text-sm font-medium">ZIP Code</Label>
                <Input
                  id="zip"
                  value={physicalCardRequest.zip}
                  onChange={(e) => setPhysicalCardRequest({...physicalCardRequest, zip: e.target.value})}
                  className="neo-inset border-0 bg-transparent mt-2"
                />
              </div>
            </div>
            <Button 
              onClick={requestPhysicalCard} 
              className="w-full neo-raised border-0 bg-gradient-to-r from-accent to-accent-glow liquid-morph"
            >
              Request Physical Card
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VirtualCards;
