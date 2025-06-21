
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
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Virtual Card
                </Badge>
                <CreditCard className="h-8 w-8" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-mono tracking-wider">{card.number}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-300">VALID THRU</p>
                    <p className="text-lg font-mono">{card.expiry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">CVV</p>
                    <p className="text-lg font-mono">{card.cvv}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">BALANCE</p>
                    <p className="text-lg font-bold">${card.balance}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate Virtual Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Create a new virtual card for online payments and transactions.
            </p>
            <Button onClick={generateCard} className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Generate New Card
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Physical Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={physicalCardRequest.address}
                onChange={(e) => setPhysicalCardRequest({...physicalCardRequest, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={physicalCardRequest.city}
                  onChange={(e) => setPhysicalCardRequest({...physicalCardRequest, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={physicalCardRequest.zip}
                  onChange={(e) => setPhysicalCardRequest({...physicalCardRequest, zip: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={requestPhysicalCard} className="w-full">
              Request Physical Card
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VirtualCards;
