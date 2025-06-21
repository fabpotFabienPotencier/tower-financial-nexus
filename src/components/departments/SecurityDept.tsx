
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, User, Bell } from 'lucide-react';

const SecurityDept = () => {
  const [securityAlerts] = useState([
    {
      id: 1,
      type: 'suspicious_login',
      user: 'john@example.com',
      description: 'Login from new country (Russia)',
      timestamp: '2024-01-15 14:30:00',
      severity: 'high',
      status: 'open'
    },
    {
      id: 2,
      type: 'multiple_failed_attempts',
      user: 'jane@example.com',
      description: '5 failed login attempts in 10 minutes',
      timestamp: '2024-01-15 12:15:00',
      severity: 'medium',
      status: 'investigating'
    }
  ]);

  const [userActivity] = useState([
    {
      user: 'john@example.com',
      action: 'Login',
      ip: '192.168.1.1',
      country: 'United States',
      timestamp: '2024-01-15 09:00:00'
    },
    {
      user: 'jane@example.com',
      action: 'Transfer',
      ip: '10.0.0.1',
      country: 'Canada',
      timestamp: '2024-01-15 08:45:00'
    }
  ]);

  const handleAlert = (id: number, action: string) => {
    console.log(`${action} alert:`, id);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{alert.type.replace('_', ' ')}</h4>
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                  <p className="text-sm text-gray-500 mb-3">User: {alert.user}</p>
                  <p className="text-xs text-gray-400 mb-3">{alert.timestamp}</p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAlert(alert.id, 'investigate')}
                    >
                      Investigate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAlert(alert.id, 'dismiss')}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Recent User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{activity.user}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{activity.ip}</p>
                    <p className="text-xs text-gray-500">{activity.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">1,247</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">98.5%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-gray-600">Blocked IPs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDept;
