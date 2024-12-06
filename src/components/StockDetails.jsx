import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PulseLoader } from 'react-spinners'; // For a custom loader

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(10); // Default to the last 10 days
  const [selectedStock, setSelectedStock] = useState("RELIANCE.BSE"); // Default stock
  const [stockData, setStockData] = useState(null); // Store stock data
  const [metrics, setMetrics] = useState({
    peRatio: null,
    eps: null,
    marketCap: null,
    dividendYield: null
  }); // Key metrics

  // Define the stock APIs array
  const stockApis = {
    "RELIANCE.BSE": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo",
    "IBM": "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo",
    "IBM-Jan-2009": "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo",
    "IBM-Jan-2009-2": "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo", // Same API, but renamed for distinction
  };

  useEffect(() => {
    const fetchStockData = async () => {
      if (!stockApis[selectedStock]) return; // Check if API for the selected stock exists

      setLoading(true);
      try {
        const response = await axios.get(stockApis[selectedStock]);
        const data = response.data;

        const labels = [];
        const openData = [];
        const closeData = [];

        let dataEntries;

        if (selectedStock === "RELIANCE.BSE" && data["Time Series (Daily)"]) {
          dataEntries = Object.entries(data["Time Series (Daily)"]).slice(0, timeRange);
        } else if (data["Time Series (5min)"]) {
          dataEntries = Object.entries(data["Time Series (5min)"]).slice(0, timeRange);
        }

        dataEntries?.forEach(([date, values]) => {
          labels.push(date);
          openData.push(parseFloat(values["1. open"]));
          closeData.push(parseFloat(values["4. close"]));
        });

        // Here, you would fetch or compute key metrics like P/E Ratio, EPS, Market Cap, Dividend Yield
        const stockMetrics = await fetchStockMetrics(selectedStock);

        console.log(selectedStock, "asldfhods ug fisdugis")

        setStockData({
          labels: labels.reverse(),
          datasets: [
            {
              label: `${selectedStock} Open Price`,
              data: openData.reverse(),
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: false,
            },
            {
              label: `${selectedStock} Close Price`,
              data: closeData.reverse(),
              borderColor: 'rgba(255,99,132,1)',
              backgroundColor: 'rgba(255,99,132,0.2)',
              fill: false,
            },
          ],
        });

        setMetrics(stockMetrics); // Update key metrics state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [selectedStock, timeRange]);

  const fetchStockMetrics = async (stock) => {
    
    console.log(stock, "stockdata")

    const dummyMetrics = {
      peRatio: "...", 
      eps: "...",
      marketCap: '...',
      dividendYield: "...",
    };
    return dummyMetrics;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <PulseLoader color="#36d7b7" size={15} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Stock Price Chart (Last {timeRange} Days) - {selectedStock}
      </h2>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <label htmlFor="timeRange" className="mr-3 text-lg text-gray-700">Select Timeline:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(parseInt(e.target.value))}
            className="p-2 rounded-md border border-gray-300 shadow-sm"
          >
            <option value={5}>Last 5 Days</option>
            <option value={10}>Last 10 Days</option>
            <option value={20}>Last 20 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={50}>Last 50 Days</option>
            <option value={100}>Last 100 Days</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="stockSelect" className="mr-3 text-lg text-gray-700">Select Stock:</label>
          <select
            id="stockSelect"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="p-2 rounded-md border border-gray-300 shadow-sm"
          >
            {Object.keys(stockApis).map((stock) => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Key Metrics</h3>
        <p><strong>P/E Ratio:</strong> {metrics.peRatio}</p>
        <p><strong>EPS:</strong> {metrics.eps}</p>
        <p><strong>Market Cap:</strong> {metrics.marketCap}</p>
        <p><strong>Dividend Yield:</strong> {metrics.dividendYield}%</p>
      </div>

      {/* Chart */}
      {stockData && <Line data={stockData} />}
    </div>
  );
};

export default StockChart;
