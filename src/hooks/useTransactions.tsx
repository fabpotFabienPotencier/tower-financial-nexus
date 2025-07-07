
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Fetch initial transactions
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setTransactions(data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    // Set up real-time subscription
    const subscription = supabase
      .channel('transactions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        console.log('Real-time transaction update:', payload);
        
        if (payload.eventType === 'INSERT') {
          setTransactions(prev => [payload.new as Transaction, ...prev.slice(0, 9)]);
          toast({
            title: "New Transaction",
            description: `${payload.new.type === 'credit' ? 'Received' : 'Sent'} ${payload.new.currency} ${payload.new.amount}`,
          });
        } else if (payload.eventType === 'UPDATE') {
          setTransactions(prev => prev.map(t => 
            t.id === payload.new.id ? payload.new as Transaction : t
          ));
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('transactions')
        .insert({
          ...transaction,
          user_id: user.id
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Transaction Failed",
        description: "Could not process transaction",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    transactions,
    loading,
    addTransaction
  };
};
