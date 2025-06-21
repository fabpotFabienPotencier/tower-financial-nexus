
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
  Clock
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
    { name: 'Payment Dept', icon: CreditCard, access: 'Fund Management', users: 5 },
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
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                Super Admin
              </Badge>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
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

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {departments.map((dept, index) => (
                    <Card key={index} className="border-slate-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2">
                          <dept.icon className="h-5 w-5 text-blue-600" />
                          <span>{dept.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-4">{dept.access}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{dept.users} active users</span>
                          <Button size="sm">Manage</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Clock className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{item.type} Request</h3>
                          <p className="text-sm text-slate-600">User: {item.user}</p>
                          {item.amount && <p className="text-sm text-slate-600">Amount: {item.amount}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-green-500 text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
