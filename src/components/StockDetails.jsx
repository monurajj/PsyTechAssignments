import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PulseLoader } from "react-spinners";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Toast from "../Toasts/pitchData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(10);
  const [selectedStock, setSelectedStock] = useState("RELIANCE.BSE");
  const [stockData, setStockData] = useState(null);
  const [metrics, setMetrics] = useState({
    peRatio: null,
    eps: null,
    marketCap: null,
    dividendYield: null,
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(true);
  const message = "Currently, the pitch data is hardcoded due to unavailability of data in the API.";

  const handleCloseToast = () => {
    setIsToastOpen(false); // Close the toast when the timeout completes or manually
  };

  // Define the stock APIs array
  const stockApis = {
    "RELIANCE.BSE": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo",
    "IBM": "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo",
    "IBM-Jan-2009": "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo",
    "IBM-Jan-2009-2": "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo",
  };

  useEffect(() => {
    // Check login status when component mounts
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchStockData = async () => {
      if (!stockApis[selectedStock]) return;

      setLoading(true);
      try {
        const response = await axios.get(stockApis[selectedStock]);
        const data = response.data;

        const labels = [];
        const openData = [];
        const closeData = [];

        let dataEntries;

        if (selectedStock === "RELIANCE.BSE" && data["Time Series (Daily)"]) {
          dataEntries = Object.entries(data["Time Series (Daily)"]).slice(
            0,
            timeRange
          );
        } else if (data["Time Series (5min)"]) {
          dataEntries = Object.entries(data["Time Series (5min)"]).slice(
            0,
            timeRange
          );
        }

        dataEntries?.forEach(([date, values]) => {
          labels.push(date);
          openData.push(parseFloat(values["1. open"]));
          closeData.push(parseFloat(values["4. close"]));
        });

        // Check if stock is already bookmarked
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const bookmarksResponse = await axios.get("/api/bookmarks", {
              headers: { Authorization: `Bearer ${token}` }
            });

            const isStockBookmarked = bookmarksResponse.data.bookmarks.some(
              bookmark => bookmark.stocks === selectedStock
            );

            setIsBookmarked(isStockBookmarked);
          } catch (error) {
            console.error("Error checking bookmarks:", error);
          }
        }

        const stockMetrics = await fetchStockMetrics(selectedStock);

        setStockData({
          labels: labels.reverse(),
          datasets: [
            {
              label: `${selectedStock} Open Price`,
              data: openData.reverse(),
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: false,
            },
            {
              label: `${selectedStock} Close Price`,
              data: closeData.reverse(),
              borderColor: "rgba(255,99,132,1)",
              backgroundColor: "rgba(255,99,132,0.2)",
              fill: false,
            },
          ],
        });

        setMetrics(stockMetrics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [selectedStock, timeRange]);

  const fetchStockMetrics = async (stock) => {
    const dummyMetrics = {
      peRatio: 12.5,
      eps: 2.3,
      marketCap: "200B",
      dividendYield: 3.2,
    };
    return dummyMetrics;
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to bookmark a stock.");
      return;
    }

    try {
      // If already bookmarked, remove the bookmark
      if (isBookmarked) {
        const response = await axios.delete(`/api/bookmarks/${selectedStock}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setIsBookmarked(false);
          alert("Stock removed from bookmarks");
        }
      } else {
        const response = await axios.post(
          "/api/bookmarks",
          { 
            stocks: selectedStock, 
            link: window.location.href 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setIsBookmarked(true);
          alert("Stock bookmarked successfully");
        }
      }
    } catch (error) {
      console.error("Error managing bookmark:", error);
      alert("Error managing bookmark");
    }
  };

  const generatePitch = () => {
    const { peRatio, eps, marketCap, dividendYield } = metrics;

    let financialHealth =
      "The stock shows a stable financial outlook with a P/E ratio of " +
      peRatio +
      ", a solid EPS of " +
      eps +
      ", and a market cap of " +
      marketCap +
      ".";
    let growthPotential =
      "The stock has a dividend yield of " +
      dividendYield +
      "%, suggesting potential for growth and income.";

    let risks =
      "Potential risks include market volatility, economic downturns, and sector-specific challenges that could impact stock performance.";

    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Stock Pitch
          </h3>

          {isLoggedIn ? (
            <div className="mb-6 text-center">
              <button onClick={handleBookmark} className="text-3xl">
                {isBookmarked ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
              <p className="mt-2">
                {isBookmarked ? "Remove Bookmark" : "Bookmark this stock"}
              </p>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <p className="text-gray-600">Please log in to bookmark stocks</p>
            </div>
          )}
        </div>

        <p>{financialHealth}</p>
        <p>{growthPotential}</p>
        <p>
          <strong>Key Risks:</strong> {risks}
        </p>
      </div>
    );
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

      <div className="flex flex-wrap justify-between mb-6">
  <div className="flex items-center mb-4 sm:mb-0 sm:mr-6">
    <label htmlFor="timeRange" className="mr-3 text-lg text-gray-700">
      Select Timeline:
    </label>
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

  <div className="flex items-center mb-4 sm:mb-0">
    <label htmlFor="stockSelect" className="mr-3 text-lg text-gray-700">
      Select Stock:
    </label>
    <select
      id="stockSelect"
      value={selectedStock}
      onChange={(e) => setSelectedStock(e.target.value)}
      className="p-2 rounded-md border border-gray-300 shadow-sm"
    >
      {Object.keys(stockApis).map((stock) => (
        <option key={stock} value={stock}>
          {stock}
        </option>
      ))}
    </select>
  </div>
</div>


      {/* Key Metrics */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Key Metrics</h3>
        <p>
          <strong>P/E Ratio:</strong> {metrics.peRatio}
        </p>
        <p>
          <strong>EPS:</strong> {metrics.eps}
        </p>
        <p>
          <strong>Market Cap:</strong> {metrics.marketCap}
        </p>
        <p>
          <strong>Dividend Yield:</strong> {metrics.dividendYield}%
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/psytechAiStockPredictor"
          className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-full text-xl mb-4"
        >
          Use AI Predictor
        </Link>
      </div>
      <div>
        <Line data={stockData} />
      </div>
      
      {/* Generate and display the stock pitch */}
      {generatePitch()}



      {/* Toast Notification */}
      <Toast message={message} isOpen={isToastOpen} onClose={handleCloseToast} />
    </div>
  );
};

export default StockChart;