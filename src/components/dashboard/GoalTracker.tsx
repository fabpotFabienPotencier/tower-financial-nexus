import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Target, 
  Plus, 
  Calendar,
  DollarSign,
  Car,
  Home,
  Plane,
  GraduationCap,
  Heart,
  Gift
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: React.ReactNode;
  color: string;
  category: string;
}

const GoalTracker = () => {
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6800,
      deadline: '2024-12-31',
      icon: <Heart className="h-5 w-5" />,
      color: 'from-destructive to-red-400',
      category: 'Safety'
    },
    {
      id: '2',
      title: 'New Car',
      targetAmount: 25000,
      currentAmount: 12500,
      deadline: '2025-06-15',
      icon: <Car className="h-5 w-5" />,
      color: 'from-primary to-primary-glow',
      category: 'Transportation'
    },
    {
      id: '3',
      title: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 18000,
      deadline: '2026-01-01',
      icon: <Home className="h-5 w-5" />,
      color: 'from-accent to-accent-glow',
      category: 'Housing'
    },
    {
      id: '4',
      title: 'Vacation Fund',
      targetAmount: 5000,
      currentAmount: 3200,
      deadline: '2024-08-01',
      icon: <Plane className="h-5 w-5" />,
      color: 'from-secondary to-secondary-glow',
      category: 'Travel'
    }
  ]);

  const [newContribution, setNewContribution] = useState('');

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const timeDiff = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getProgressStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return { status: 'completed', color: 'accent' };
    if (percentage >= 75) return { status: 'excellent', color: 'primary' };
    if (percentage >= 50) return { status: 'good', color: 'secondary' };
    return { status: 'needs attention', color: 'destructive' };
  };

  return (
    <Card className="neo-raised liquid-morph border-0 bg-gradient-to-br from-card to-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="neo-inset p-2 rounded-xl">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <span className="gradient-text">Financial Goals</span>
          </CardTitle>
          <Button size="sm" className="neo-raised border-0 bg-gradient-to-r from-primary to-primary-glow liquid-morph">
            <Plus className="h-4 w-4 mr-1" />
            New Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          const daysLeft = getDaysRemaining(goal.deadline);
          const status = getProgressStatus(goal.currentAmount, goal.targetAmount);
          
          return (
            <div 
              key={goal.id}
              className="liquid-wave neo-inset p-6 rounded-2xl liquid-morph space-y-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`neo-raised p-3 rounded-xl bg-gradient-to-r ${goal.color}`}>
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.category}</p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`neo-inset text-${status.color}`}
                >
                  {status.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="neo-inset p-3 rounded-xl">
                  <p className="text-sm text-muted-foreground">Current</p>
                  <p className="text-xl font-bold gradient-text">
                    ${goal.currentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="neo-inset p-3 rounded-xl">
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="text-xl font-semibold">
                    ${goal.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                </div>
                <div className="neo-inset p-1 rounded-full">
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                </div>
                <span className="font-medium">
                  ${remaining.toLocaleString()} remaining
                </span>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Add contribution"
                  value={newContribution}
                  onChange={(e) => setNewContribution(e.target.value)}
                  className="neo-inset border-0 bg-transparent"
                />
                <Button 
                  size="sm" 
                  className="neo-raised border-0 bg-gradient-to-r from-accent to-accent-glow liquid-morph"
                >
                  <DollarSign className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}

        <div className="neo-inset p-6 rounded-2xl text-center space-y-4">
          <div className="neo-raised p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 inline-block">
            <Gift className="h-8 w-8 text-primary mx-auto" />
          </div>
          <div>
            <h3 className="font-semibold text-lg gradient-text">Create Your Next Goal</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Start saving for something special today
            </p>
          </div>
          <Button className="neo-raised border-0 bg-gradient-to-r from-primary to-primary-glow liquid-morph">
            <Plus className="h-4 w-4 mr-2" />
            Add New Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalTracker;