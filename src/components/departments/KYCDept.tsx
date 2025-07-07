
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Check, XCircle, Clock, Loader2 } from 'lucide-react';
import { useKYC } from '@/hooks/useKYC';

const KYCDept = () => {
  const { kycRequests, loading, updateKYCStatus } = useKYC();

  const approveKYC = async (id: string) => {
    await updateKYCStatus(id, 'approved');
  };

  const rejectKYC = async (id: string) => {
    await updateKYCStatus(id, 'rejected');
  };

  const setUnderReview = async (id: string) => {
    await updateKYCStatus(id, 'under_review');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            KYC Verification Queue ({kycRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {kycRequests.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No KYC requests at the moment</p>
          ) : (
            <div className="space-y-6">
              {kycRequests.map((kyc) => (
                <div key={kyc.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {kyc.profile?.first_name} {kyc.profile?.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">{kyc.profile?.email}</p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(kyc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-${
                        kyc.status === 'approved' ? 'green' : 
                        kyc.status === 'rejected' ? 'red' : 
                        'yellow'
                      }-400 text-${
                        kyc.status === 'approved' ? 'green' : 
                        kyc.status === 'rejected' ? 'red' : 
                        'yellow'
                      }-600`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {kyc.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Submitted Documents:</h4>
                    <div className="space-y-2">
                      {kyc.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{doc}</span>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {kyc.status === 'pending' || kyc.status === 'under_review' ? (
                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => approveKYC(kyc.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => rejectKYC(kyc.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      {kyc.status === 'pending' && (
                        <Button 
                          variant="outline"
                          onClick={() => setUnderReview(kyc.id)}
                        >
                          Start Review
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      Status: {kyc.status} on {new Date(kyc.updated_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCDept;
