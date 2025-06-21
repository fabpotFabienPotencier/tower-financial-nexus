
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Camera } from 'lucide-react';

const QRPayments = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    currency: 'USD',
    description: ''
  });
  const [qrCode, setQrCode] = useState('');
  const [scanMode, setScanMode] = useState(false);

  const generateQR = () => {
    const qrData = JSON.stringify({
      amount: paymentData.amount,
      currency: paymentData.currency,
      description: paymentData.description,
      account: '12345678',
      timestamp: Date.now()
    });
    setQrCode(qrData);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Generate QR Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={paymentData.currency}
                onChange={(e) => setPaymentData({...paymentData, currency: e.target.value})}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Payment for..."
                value={paymentData.description}
                onChange={(e) => setPaymentData({...paymentData, description: e.target.value})}
              />
            </div>
            <Button onClick={generateQR} className="w-full">
              Generate QR Code
            </Button>
            {qrCode && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <div className="w-32 h-32 bg-black mx-auto mb-2 flex items-center justify-center text-white text-xs">
                  QR CODE
                </div>
                <p className="text-sm text-gray-600">QR Code Generated</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Scan QR Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {scanMode ? (
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Camera Preview</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tap to scan QR code</p>
                  </div>
                )}
              </div>
              <Button 
                onClick={() => setScanMode(!scanMode)}
                variant={scanMode ? "secondary" : "default"}
                className="w-full"
              >
                {scanMode ? 'Stop Scanning' : 'Start Scanning'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRPayments;
