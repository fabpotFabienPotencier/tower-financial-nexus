
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowUp, ArrowDown } from 'lucide-react';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CryptoWallet = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [portfolio] = useState([
    { symbol: 'BTC', amount: 0.025, name: 'Bitcoin' },
    { symbol: 'ETH', amount: 0.5, name: 'Ethereum' },
    { symbol: 'ADA', amount: 100, name: 'Cardano' }
  ]);

  useEffect(() => {
    // Simulate CoinGecko API call
    const mockPrices: CryptoPrice[] = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 45000,
        price_change_percentage_24h: 2.5
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 3200,
        price_change_percentage_24h: -1.2
      },
      {
        id: 'cardano',
        symbol: 'ada',
        name: 'Cardano',
        current_price: 0.45,
        price_change_percentage_24h: 5.8
      }
    ];
    setCryptoPrices(mockPrices);
  }, []);

  const getPrice = (symbol: string) => {
    const crypto = cryptoPrices.find(c => c.symbol === symbol.toLowerCase());
    return crypto ? crypto.current_price : 0;
  };

  const getPriceChange = (symbol: string) => {
    const crypto = cryptoPrices.find(c => c.symbol === symbol.toLowerCase());
    return crypto ? crypto.price_change_percentage_24h : 0;
  };

  const calculateValue = (amount: number, symbol: string) => {
    return amount * getPrice(symbol);
  };

  const totalPortfolioValue = portfolio.reduce((total, item) => {
    return total + calculateValue(item.amount, item.symbol);
  }, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            Crypto Portfolio
          </CardTitle>
          <div className="text-2xl font-bold text-green-600">
            ${totalPortfolioValue.toLocaleString()}
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {portfolio.map((item, index) => {
          const price = getPrice(item.symbol);
          const value = calculateValue(item.amount, item.symbol);
          const change = getPriceChange(item.symbol);
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.symbol.toUpperCase()}</p>
                  </div>
                  <Badge variant={change >= 0 ? 'default' : 'destructive'}>
                    {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Holdings</span>
                    <span className="font-medium">{item.amount} {item.symbol.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price</span>
                    <span className="font-medium">${price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Value</span>
                    <span className="font-bold">${value.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Buy
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    Sell
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoWallet;
