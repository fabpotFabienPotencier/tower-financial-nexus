
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Check, XCircle, Clock } from 'lucide-react';

const KYCDept = () => {
  const [pendingKYC] = useState([
    {
      id: 1,
      user: 'john@example.com',
      name: 'John Doe',
      documents: ['passport.jpg', 'utility_bill.pdf'],
      submitted: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      user: 'jane@example.com',
      name: 'Jane Smith',
      documents: ['drivers_license.jpg', 'bank_statement.pdf'],
      submitted: '2024-01-14',
      status: 'under_review'
    }
  ]);

  const approveKYC = (id: number) => {
    console.log('Approving KYC:', id);
  };

  const rejectKYC = (id: number) => {
    console.log('Rejecting KYC:', id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            KYC Verification Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pendingKYC.map((kyc) => (
              <div key={kyc.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{kyc.name}</h3>
                    <p className="text-sm text-gray-600">{kyc.user}</p>
                    <p className="text-sm text-gray-500">Submitted: {kyc.submitted}</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-400 text-yellow-600">
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
                  <Button variant="outline">
                    Request More Info
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCDept;
