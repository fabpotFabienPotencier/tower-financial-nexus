
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Banknote, ArrowUp, ArrowDown, Settings } from 'lucide-react';

const PaymentDept = () => {
  const [fxRates, setFxRates] = useState({
    USDEUR: 0.85,
    USDBTC: 0.000022,
    EURBTC: 0.000026
  });

  const [fundingData, setFundingData] = useState({
    account: '',
    amount: '',
    currency: 'USD'
  });

  const [pendingWithdrawals] = useState([
    { id: 1, user: 'john@example.com', amount: 5000, currency: 'USD', status: 'pending' },
    { id: 2, user: 'jane@example.com', amount: 2500, currency: 'EUR', status: 'pending' }
  ]);

  const updateFXRate = (pair: string, rate: number) => {
    setFxRates(prev => ({ ...prev, [pair]: rate }));
  };

  const fundAccount = () => {
    console.log('Funding account:', fundingData);
  };

  const approveWithdrawal = (id: number) => {
    console.log('Approving withdrawal:', id);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              FX Rate Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(fxRates).map(([pair, rate]) => (
              <div key={pair} className="flex items-center justify-between">
                <span className="font-medium">{pair}</span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    step="0.000001"
                    value={rate}
                    onChange={(e) => updateFXRate(pair, parseFloat(e.target.value))}
                    className="w-32"
                  />
                  <Button size="sm">Update</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Banknote className="h-5 w-5 mr-2" />
              Fund User Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="account">Account Number/Email</Label>
              <Input
                id="account"
                value={fundingData.account}
                onChange={(e) => setFundingData({...fundingData, account: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={fundingData.amount}
                onChange={(e) => setFundingData({...fundingData, amount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={fundingData.currency}
                onChange={(e) => setFundingData({...fundingData, currency: e.target.value})}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
            <Button onClick={fundAccount} className="w-full">
              <ArrowUp className="h-4 w-4 mr-2" />
              Fund Account
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingWithdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{withdrawal.user}</p>
                  <p className="text-sm text-gray-600">
                    {withdrawal.currency} {withdrawal.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Pending</Badge>
                  <Button 
                    size="sm" 
                    onClick={() => approveWithdrawal(withdrawal.id)}
                  >
                    Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDept;
