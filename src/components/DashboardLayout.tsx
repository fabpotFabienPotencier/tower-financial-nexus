
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  CreditCard, 
  QrCode, 
  ArrowUp, 
  ArrowDown,
  Bell,
  User,
  Shield,
  LogOut
} from 'lucide-react';

const DashboardLayout = () => {
  const accountData = {
    primaryAccount: "12345678",
    balance: "25,430.50",
    currency: "USD"
  };

  const recentTransactions = [
    { id: 1, type: "credit", amount: "+$1,500.00", description: "Salary Deposit", date: "Today" },
    { id: 2, type: "debit", amount: "-$89.99", description: "QR Payment - Coffee Shop", date: "Yesterday" },
    { id: 3, type: "credit", amount: "+€850.00", description: "EUR Account Transfer", date: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">TowerFinance</h1>
                <p className="text-sm text-slate-600">Account: {accountData.primaryAccount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-blue-100 mb-1">Primary Account Balance</p>
                    <h2 className="text-3xl font-bold">${accountData.balance}</h2>
                  </div>
                  <Wallet className="h-12 w-12 text-blue-200" />
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    {accountData.currency}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    ✓ Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-16 flex flex-col items-center justify-center space-y-2">
                    <ArrowUp className="h-6 w-6" />
                    <span>Send Money</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                    <ArrowDown className="h-6 w-6" />
                    <span>Request Withdrawal</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                    <QrCode className="h-6 w-6" />
                    <span>QR Payment</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? 
                            <ArrowDown className="h-4 w-4" /> : 
                            <ArrowUp className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{transaction.description}</p>
                          <p className="text-sm text-slate-600">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">USD Account</span>
                  <span className="font-semibold">$25,430.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">EUR Account</span>
                  <span className="font-semibold">€1,280.75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">BTC Wallet</span>
                  <span className="font-semibold">0.025 BTC</span>
                </div>
                <Button variant="outline" className="w-full">
                  Open New Account
                </Button>
              </CardContent>
            </Card>

            {/* Virtual Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Virtual Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-300">Virtual Card</span>
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-mono mb-2">**** **** **** 8976</p>
                  <div className="flex justify-between text-sm">
                    <span>12/26</span>
                    <span>Active</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Generate New Card
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
