
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
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className={`${
            account.type === 'primary' ? 'border-blue-500 bg-blue-50' : 
            account.type === 'crypto' ? 'border-orange-500 bg-orange-50' : 
            'border-gray-200'
          }`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{account.currency} Account</span>
                <Badge variant={account.type === 'primary' ? 'default' : 'secondary'}>
                  {account.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Account: {account.number}</p>
                <p className="text-2xl font-bold">
                  {account.currency === 'BTC' ? 
                    `${account.balance} BTC` : 
                    `${account.currency === 'USD' ? '$' : '€'}${account.balance.toLocaleString()}`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Internal Transfer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="from">From Account</Label>
                <Input
                  id="from"
                  placeholder="Account number or email"
                  value={transferData.from}
                  onChange={(e) => setTransferData({...transferData, from: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="to">To Account</Label>
                <Input
                  id="to"
                  placeholder="Account number or email"
                  value={transferData.to}
                  onChange={(e) => setTransferData({...transferData, to: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select 
                  className="w-full p-2 border rounded-md"
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
          <div className="mt-6 flex space-x-4">
            <Button onClick={handleTransfer} className="flex-1">
              <ArrowUp className="h-4 w-4 mr-2" />
              Send Transfer
            </Button>
            <Button variant="outline" className="flex-1">
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
