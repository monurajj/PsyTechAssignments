import React from "react";
import { Link } from "react-router-dom";
import sampleImage1 from "../assets/psytechImage04.png";
import sampleImage2 from "../assets/psyteckImage02.png";
import sampleImage3 from "../assets/psyteckImage03.png";
import AboutUs from "./aboutUs";
// import PsytechChatbot from "../ChatSupport/chatsupport";
// import MainPage from "../FinanceModeling/mainPage";

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to PsytechStocks</h1>
          <p className="text-lg text-gray-700">
            Discover insights into stock markets, stay informed with detailed analysis, and make smarter investment decisions.
          </p>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <img src={sampleImage1} alt="Stock Insights" className="rounded-lg shadow-lg" />
          <img src={sampleImage2} alt="Market Trends" className="rounded-lg shadow-lg" />
          <img src={sampleImage3} alt="Investment Strategies" className="rounded-lg shadow-lg" />
        </div>

        {/* Use Now Button */}
        <div className="text-center">
          <Link
            to="/analysis"
            className="bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transform transition"
          >
            Use Now
          </Link>
        </div>
      </div>

      <AboutUs/>
      {/* <PsytechChatbot/> */}

      {/* <MainPage/> */}
    </div>
  );
}

export default HomePage;
