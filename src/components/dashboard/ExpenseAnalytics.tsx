import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart, 
  BarChart3, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

const ExpenseAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const categoryData = [
    { name: 'Food & Dining', amount: 1250, percentage: 35, color: 'from-primary to-primary-glow', trend: '+12%' },
    { name: 'Transportation', amount: 680, percentage: 19, color: 'from-accent to-accent-glow', trend: '-5%' },
    { name: 'Entertainment', amount: 420, percentage: 12, color: 'from-secondary to-secondary-glow', trend: '+8%' },
    { name: 'Shopping', amount: 380, percentage: 11, color: 'from-destructive to-red-400', trend: '+25%' },
    { name: 'Utilities', amount: 320, percentage: 9, color: 'from-blue-500 to-blue-400', trend: '0%' },
    { name: 'Others', amount: 500, percentage: 14, color: 'from-purple-500 to-purple-400', trend: '-2%' }
  ];

  const monthlyTrends = [
    { month: 'Jan', amount: 2800, change: '+5%' },
    { month: 'Feb', amount: 3200, change: '+14%' },
    { month: 'Mar', amount: 2950, change: '-8%' },
    { month: 'Apr', amount: 3550, change: '+20%' },
    { month: 'May', amount: 3100, change: '-13%' },
    { month: 'Jun', amount: 3650, change: '+18%' }
  ];

  const totalAmount = categoryData.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Card className="neo-raised liquid-morph border-0 bg-gradient-to-br from-card to-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="neo-inset p-2 rounded-xl">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span className="gradient-text">Expense Analytics</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="neo-inset">
              <Calendar className="h-3 w-3 mr-1" />
              This Month
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 neo-inset bg-transparent">
            <TabsTrigger value="categories" className="neo-raised data-[state=active]:neo-pressed">
              Categories
            </TabsTrigger>
            <TabsTrigger value="trends" className="neo-raised data-[state=active]:neo-pressed">
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold gradient-text">${totalAmount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>

            <div className="space-y-3">
              {categoryData.map((category, index) => {
                const isPositive = category.trend.startsWith('+');
                const isNegative = category.trend.startsWith('-');
                
                return (
                  <div 
                    key={category.name}
                    className="liquid-wave neo-inset p-4 rounded-2xl liquid-morph"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`}></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isPositive && <TrendingUp className="h-4 w-4 text-destructive" />}
                        {isNegative && <TrendingDown className="h-4 w-4 text-accent" />}
                        {!isPositive && !isNegative && <Activity className="h-4 w-4 text-muted-foreground" />}
                        <span className={`text-sm font-medium ${
                          isPositive ? 'text-destructive' : isNegative ? 'text-accent' : 'text-muted-foreground'
                        }`}>
                          {category.trend}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">${category.amount}</span>
                      <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                    </div>
                    <div className="mt-2 neo-inset p-1 rounded-full">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="neo-inset p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-accent">+12.5%</p>
                <p className="text-sm text-muted-foreground">vs Last Month</p>
              </div>
              <div className="neo-inset p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-primary">$3,550</p>
                <p className="text-sm text-muted-foreground">Average Monthly</p>
              </div>
            </div>

            <div className="space-y-3">
              {monthlyTrends.map((trend, index) => {
                const isPositive = trend.change.startsWith('+');
                
                return (
                  <div 
                    key={trend.month}
                    className="liquid-wave neo-inset p-4 rounded-2xl liquid-morph flex items-center justify-between"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="neo-raised p-2 rounded-xl w-12 text-center">
                        <span className="font-medium text-sm">{trend.month}</span>
                      </div>
                      <span className="text-lg font-semibold">${trend.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-destructive" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-accent" />
                      )}
                      <span className={`font-medium ${
                        isPositive ? 'text-destructive' : 'text-accent'
                      }`}>
                        {trend.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseAnalytics;