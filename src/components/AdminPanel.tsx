
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  CreditCard, 
  FileText, 
  Settings,
  Bell,
  User,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Banknote
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import PaymentDept from './departments/PaymentDept';
import KYCDept from './departments/KYCDept';
import SecurityDept from './departments/SecurityDept';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();

  const departmentStats = [
    { name: 'Total Users', value: '1,247', icon: Users, color: 'blue' },
    { name: 'Pending KYC', value: '23', icon: FileText, color: 'yellow' },
    { name: 'Active Cards', value: '892', icon: CreditCard, color: 'green' },
    { name: 'Security Alerts', value: '3', icon: Shield, color: 'red' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'KYC', user: 'John Doe', amount: null, status: 'pending' },
    { id: 2, type: 'Withdrawal', user: 'Jane Smith', amount: '$5,000', status: 'pending' },
    { id: 3, type: 'Card Request', user: 'Mike Johnson', amount: null, status: 'pending' }
  ];

  const departments = [
    { name: 'Admin', icon: Settings, access: 'Full Control', users: 3 },
    { name: 'Payment Dept', icon: Banknote, access: 'Fund Management', users: 5 },
    { name: 'KYC Dept', icon: FileText, access: 'Document Verification', users: 4 },
    { name: 'Security Dept', icon: Shield, access: 'Monitoring & Fraud', users: 6 }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold">TowerFinance Admin</h1>
                <p className="text-sm text-slate-400">Administrative Control Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">Welcome, {user?.firstName}</span>
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                {user?.role === 'admin' ? 'Super Admin' : user?.role}
              </Badge>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment">Payment Dept</TabsTrigger>
            <TabsTrigger value="kyc">KYC Dept</TabsTrigger>
            <TabsTrigger value="security">Security Dept</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {departmentStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">{stat.name}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{item.type} - {item.user}</p>
                          {item.amount && <p className="text-sm text-slate-600">{item.amount}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-yellow-400 text-yellow-600">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <dept.icon className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-medium text-slate-900">{dept.name}</p>
                            <p className="text-sm text-slate-600">{dept.access}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{dept.users} users</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <PaymentDept />
          </TabsContent>

          <TabsContent value="kyc">
            <KYCDept />
          </TabsContent>

          <TabsContent value="security">
            <SecurityDept />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-3">Security Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Require 2FA for all users</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">IP monitoring enabled</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Email notifications for suspicious activity</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-3">System Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Auto-approve small transactions</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Maintenance mode</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Real-time notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
