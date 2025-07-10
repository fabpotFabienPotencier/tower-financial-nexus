import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Utensils, 
  Car, 
  Home, 
  GamepadIcon, 
  Plus,
  Wallet,
  AlertTriangle
} from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  spent: number;
  budget: number;
  color: string;
}

const BudgetTracker = () => {
  const [budgets] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'Groceries',
      icon: <ShoppingCart className="h-5 w-5" />,
      spent: 340,
      budget: 500,
      color: 'from-primary to-primary-glow'
    },
    {
      id: '2',
      name: 'Dining Out',
      icon: <Utensils className="h-5 w-5" />,
      spent: 280,
      budget: 300,
      color: 'from-accent to-accent-glow'
    },
    {
      id: '3',
      name: 'Transportation',
      icon: <Car className="h-5 w-5" />,
      spent: 180,
      budget: 400,
      color: 'from-secondary to-secondary-glow'
    },
    {
      id: '4',
      name: 'Utilities',
      icon: <Home className="h-5 w-5" />,
      spent: 220,
      budget: 250,
      color: 'from-primary to-accent'
    },
    {
      id: '5',
      name: 'Entertainment',
      icon: <GamepadIcon className="h-5 w-5" />,
      spent: 95,
      budget: 150,
      color: 'from-accent to-primary'
    }
  ]);

  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.budget, 0);

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { status: 'critical', color: 'destructive' };
    if (percentage >= 75) return { status: 'warning', color: 'warning' };
    return { status: 'good', color: 'success' };
  };

  return (
    <Card className="neo-raised liquid-morph border-0 bg-gradient-to-br from-card to-card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="neo-inset p-2 rounded-xl">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="gradient-text">Budget Tracker</span>
          </CardTitle>
          <Button size="sm" className="neo-raised border-0 bg-gradient-to-r from-primary to-primary-glow liquid-morph">
            <Plus className="h-4 w-4 mr-1" />
            Add Budget
          </Button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold gradient-text">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-xl font-semibold">${totalBudget.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-medium">
              {Math.round((totalSpent / totalBudget) * 100)}%
            </span>
          </div>
          <div className="neo-inset p-1 rounded-full">
            <Progress 
              value={(totalSpent / totalBudget) * 100} 
              className="h-3 bg-transparent"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.budget) * 100;
          const status = getBudgetStatus(budget.spent, budget.budget);
          
          return (
            <div 
              key={budget.id} 
              className="liquid-wave neo-inset p-4 rounded-2xl liquid-morph"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`neo-raised p-2 rounded-xl bg-gradient-to-r ${budget.color}`}>
                    {budget.icon}
                  </div>
                  <div>
                    <p className="font-medium">{budget.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${budget.spent} of ${budget.budget}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {status.status === 'critical' && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <Badge 
                    variant={status.status === 'critical' ? 'destructive' : 'secondary'}
                    className="neo-inset"
                  >
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <div className="neo-inset p-1 rounded-full">
                <Progress 
                  value={percentage} 
                  className={`h-2 bg-transparent transition-all duration-500`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;