import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Send, Loader2, BarChart2, TrendingUp, DollarSign, Layers } from 'lucide-react';

const AIStockPredictor = () => {
  const [selectedTimeline, setSelectedTimeline] = useState('Last 30 Days');
  const [selectedStock, setSelectedStock] = useState('RELIANCE.BSE');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState('');

  const timelines = [
    'Last 5 Days', 
    'Last 10 Days', 
    'Last 20 Days', 
    'Last 30 Days', 
    'Last 50 Days', 
    'Last 100 Days'
  ];

  const stocks = [
    'RELIANCE.BSE', 
    'IBM', 
    'IBM-Jan-2009', 
    'IBM-Jan-2009-2'
  ];

  const keyMetrics = {
    'RELIANCE.BSE': {
      'P/E Ratio': 12.5,
      'EPS': 2.3,
      'Market Cap': '200B',
      'Dividend Yield': '3.2%'
    },
    'IBM': {
      'P/E Ratio': 15.7,
      'EPS': 3.1,
      'Market Cap': '150B',
      'Dividend Yield': '4.5%'
    }
  };

  const mockPredictionData = {
    'Last 30 Days': [
      { name: 'Day 1', price: 100 },
      { name: 'Day 7', price: 105 },
      { name: 'Day 15', price: 103 },
      { name: 'Day 22', price: 108 },
      { name: 'Day 30', price: 110 }
    ]
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setError('');
    setPredictionResult(null);
    

    try {
      const predictionEndpoint = process.env.REACT_APP_STOCK_PREDICTION_API || 'https://chat-bot-chi-rose.vercel.app/prompt';
      
      const response = await fetch(predictionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock: selectedStock,
          timeline: selectedTimeline
        })
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (err) {

      setError('Failed to get prediction. Using mock data.');
      
      setPredictionResult({
        predictions: [
          'Slight bullish trend expected',
          'Potential 5-7% growth in next 30 days',
          'Support levels around current price point'
        ],
        mockData: mockPredictionData[selectedTimeline]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <BarChart2 className="mr-2 text-blue-600" /> 
            AI Stock Predictor
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Selection Section */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Timeline</label>
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {timelines.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Stock</label>
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {stocks.map(stock => (
                  <option key={stock} value={stock}>{stock}</option>
                ))}
              </select>
            </div>

            {/* Key Metrics */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
              {Object.entries(keyMetrics[selectedStock] || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2" />
                  Predict Performance
                </>
              )}
            </button>
          </div>

          {/* Prediction Results Section */}
          <div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {predictionResult && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <DollarSign className="mr-2 text-green-600" />
                  Performance Prediction
                </h3>

                {predictionResult.predictions && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Key Insights</h4>
                    <ul className="list-disc pl-5">
                      {predictionResult.predictions.map((prediction, index) => (
                        <li key={index} className="mb-2">{prediction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {predictionResult.mockData && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={predictionResult.mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStockPredictor;