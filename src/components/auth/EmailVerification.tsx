
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface EmailVerificationProps {
  email: string;
  onBack: () => void;
}

const EmailVerification = ({ email, onBack }: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Email Sent",
          description: "Verification email has been resent to your inbox.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend verification email",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Mail className="h-16 w-16 text-blue-600" />
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Check Your Email
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Almost there! We've sent you a verification link.
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Verification sent to:</span>
            </div>
            <p className="font-semibold text-blue-800 break-all">{email}</p>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-600 text-left space-y-2">
              <p>📧 <strong>Check your inbox</strong> for the verification email</p>
              <p>📁 <strong>Check spam/junk folder</strong> if you don't see it</p>
              <p>🔗 <strong>Click the verification link</strong> to activate your account</p>
            </div>
          </div>
          
          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleResendEmail}
              disabled={isResending}
              variant="outline"
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
            
            <Button 
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p><strong>Having trouble?</strong></p>
            <p>Make sure to click the link from the same device/browser you registered from.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
