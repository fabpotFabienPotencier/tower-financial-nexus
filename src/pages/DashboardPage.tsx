
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CreditCard, QrCode, Shield } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  const dashboardItems = [
    {
      title: 'Account Balance',
      value: '$2,500.00',
      icon: Wallet,
      description: 'Available balance'
    },
    {
      title: 'Virtual Cards',
      value: '3 Active',
      icon: CreditCard,
      description: 'Manage your cards'
    },
    {
      title: 'QR Payments',
      value: 'Ready',
      icon: QrCode,
      description: 'Scan to pay'
    },
    {
      title: 'Security',
      value: 'Verified',
      icon: Shield,
      description: 'Account secure'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Account: {user?.accountNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No recent transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600">
                • Generate virtual card
              </div>
              <div className="text-sm text-gray-600">
                • Send money via QR
              </div>
              <div className="text-sm text-gray-600">
                • View transaction history
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
