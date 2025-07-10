import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  PiggyBank,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

const StatsCard = ({ title, value, change, changeType, icon, description }: StatsCardProps) => {
  const changeColor = changeType === 'positive' ? 'text-accent' : 
                     changeType === 'negative' ? 'text-destructive' : 'text-muted-foreground';
  
  const TrendIcon = changeType === 'positive' ? TrendingUp : 
                   changeType === 'negative' ? TrendingDown : Activity;

  return (
    <Card className="neo-raised liquid-morph hover:neo-floating border-0 bg-gradient-to-br from-card to-card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className="text-2xl font-bold gradient-text">{value}</p>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          <div className="neo-inset p-3 rounded-2xl">
            {icon}
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <TrendIcon className={`h-4 w-4 ${changeColor}`} />
          <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  const statsData = [
    {
      title: 'Total Balance',
      value: '$25,430.50',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <Wallet className="h-6 w-6 text-primary" />,
      description: 'Across all accounts'
    },
    {
      title: 'Monthly Spending',
      value: '$3,247.85',
      change: '-8.2%',
      changeType: 'positive' as const,
      icon: <CreditCard className="h-6 w-6 text-secondary" />,
      description: 'Current month'
    },
    {
      title: 'Savings Goal',
      value: '68%',
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: <Target className="h-6 w-6 text-accent" />,
      description: '$6,800 of $10,000'
    },
    {
      title: 'Investment Return',
      value: '+$1,247',
      change: '+15.7%',
      changeType: 'positive' as const,
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      description: 'This quarter'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div key={stat.title} className="liquid-float" style={{ animationDelay: `${index * 0.1}s` }}>
          <StatsCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;