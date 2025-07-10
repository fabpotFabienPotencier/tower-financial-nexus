
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, CreditCard, QrCode, ArrowUp, ArrowDown } from 'lucide-react';

const AccountManager = () => {
  const [accounts] = useState([
    { id: 1, number: '12345678', currency: 'USD', balance: 25430.50, type: 'primary' },
    { id: 2, number: '87654321', currency: 'EUR', balance: 1280.75, type: 'sub' },
    { id: 3, number: '45678912', currency: 'BTC', balance: 0.025, type: 'crypto' }
  ]);

  const [transferData, setTransferData] = useState({
    from: '',
    to: '',
    amount: '',
    currency: 'USD'
  });

  const handleTransfer = () => {
    console.log('Transfer:', transferData);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <div key={account.id} className="liquid-float" style={{ animationDelay: `${index * 0.1}s` }}>
            <Card className={`neo-raised liquid-morph hover:neo-floating border-0 bg-gradient-to-br ${
              account.type === 'primary' ? 'from-primary/10 to-primary-glow/10' : 
              account.type === 'crypto' ? 'from-accent/10 to-accent-glow/10' : 
              'from-card to-card-hover'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg gradient-text">{account.currency} Account</span>
                  <Badge 
                    variant={account.type === 'primary' ? 'default' : 'secondary'}
                    className="neo-inset"
                  >
                    {account.type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="neo-inset p-3 rounded-xl">
                    <p className="text-sm text-muted-foreground">Account: {account.number}</p>
                  </div>
                  <p className="text-3xl font-bold gradient-text">
                    {account.currency === 'BTC' ? 
                      `${account.balance} BTC` : 
                      `${account.currency === 'USD' ? '$' : '€'}${account.balance.toLocaleString()}`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Card className="neo-raised liquid-morph border-0 bg-gradient-to-br from-card to-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="neo-inset p-2 rounded-xl">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="gradient-text">Internal Transfer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="from" className="text-sm font-medium">From Account</Label>
                <Input
                  id="from"
                  placeholder="Account number or email"
                  value={transferData.from}
                  onChange={(e) => setTransferData({...transferData, from: e.target.value})}
                  className="neo-inset border-0 bg-transparent mt-2"
                />
              </div>
              <div>
                <Label htmlFor="to" className="text-sm font-medium">To Account</Label>
                <Input
                  id="to"
                  placeholder="Account number or email"
                  value={transferData.to}
                  onChange={(e) => setTransferData({...transferData, to: e.target.value})}
                  className="neo-inset border-0 bg-transparent mt-2"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                  className="neo-inset border-0 bg-transparent mt-2"
                />
              </div>
              <div>
                <Label htmlFor="currency" className="text-sm font-medium">Currency</Label>
                <select 
                  className="w-full p-3 neo-inset border-0 bg-transparent rounded-xl mt-2 focus:outline-none"
                  value={transferData.currency}
                  onChange={(e) => setTransferData({...transferData, currency: e.target.value})}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="BTC">BTC</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 flex space-x-4">
            <Button 
              onClick={handleTransfer} 
              className="flex-1 neo-raised border-0 bg-gradient-to-r from-primary to-primary-glow liquid-morph"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Send Transfer
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 neo-raised border-0 bg-gradient-to-r from-secondary to-secondary-glow liquid-morph"
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              Request Withdrawal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountManager;
