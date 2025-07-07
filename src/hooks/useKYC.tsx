
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface KYCRequest {
  id: string;
  user_id: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  documents: string[];
  created_at: string;
  updated_at: string;
  profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const useKYC = () => {
  const [kycRequests, setKycRequests] = useState<KYCRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch initial KYC requests
    const fetchKYCRequests = async () => {
      try {
        let query = supabase
          .from('kyc_requests')
          .select(`
            *,
            profiles:user_id (
              first_name,
              last_name,
              email
            )
          `);

        // If not admin, only show user's own requests
        if (user?.role !== 'admin' && user?.role !== 'kyc') {
          query = query.eq('user_id', user?.id);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setKycRequests(data || []);
      } catch (error) {
        console.error('Error fetching KYC requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchKYCRequests();

      // Set up real-time subscription
      const subscription = supabase
        .channel('kyc_requests')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'kyc_requests'
        }, (payload) => {
          console.log('Real-time KYC update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setKycRequests(prev => [payload.new as KYCRequest, ...prev]);
            if (user.role === 'admin' || user.role === 'kyc') {
              toast({
                title: "New KYC Request",
                description: "A new KYC verification request has been submitted",
              });
            }
          } else if (payload.eventType === 'UPDATE') {
            setKycRequests(prev => prev.map(k => 
              k.id === payload.new.id ? payload.new as KYCRequest : k
            ));
            
            // Notify user if their KYC status changed
            if (payload.new.user_id === user.id) {
              toast({
                title: "KYC Status Updated",
                description: `Your KYC request is now ${payload.new.status}`,
              });
            }
          }
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const updateKYCStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('kyc_requests')
        .update({ 
          status: status as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating KYC status:', error);
      toast({
        title: "Update Failed",
        description: "Could not update KYC status",
        variant: "destructive"
      });
      return false;
    }
  };

  const submitKYCRequest = async (documents: string[]) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('kyc_requests')
        .insert({
          user_id: user.id,
          documents,
          status: 'pending'
        });

      if (error) throw error;
      toast({
        title: "KYC Request Submitted",
        description: "Your KYC documents have been submitted for review",
      });
      return true;
    } catch (error) {
      console.error('Error submitting KYC request:', error);
      toast({
        title: "Submission Failed",
        description: "Could not submit KYC request",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    kycRequests,
    loading,
    updateKYCStatus,
    submitKYCRequest
  };
};
