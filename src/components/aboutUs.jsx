import React from "react";
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            At <span className="font-semibold">PsytechStocks</span>, we aim to revolutionize the way individuals approach the stock market, offering smarter insights and higher profitability for every investor.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to empower investors by providing comprehensive market analysis, cutting-edge tools, and expert insights. We strive to simplify complex market data, helping you make informed decisions that lead to more profitable investments.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where anyone, regardless of their background, can succeed in the stock market. By leveraging technology and data-driven strategies, we aim to bridge the gap between traditional investing and modern, innovative approaches.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Integrity</h3>
            <p className="text-gray-700">
              Transparency and honesty are at the core of everything we do. We provide unbiased insights to empower our users.
            </p>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-green-600 mb-2">Innovation</h3>
            <p className="text-gray-700">
              Constantly pushing boundaries, we use the latest technology to create tools that make investing easier and smarter.
            </p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-yellow-600 mb-2">Profitability</h3>
            <p className="text-gray-700">
              Our goal is to maximize your returns by providing actionable, data-driven insights tailored to your needs.
            </p>
          </div>
        </div>

        {/* Chat Support Section */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Get Your Stock Insights with Our AI Chat Support
          </h2>
          <p className="text-gray-700 mb-6">
            Have any questions about stock market trends? Our AI-powered chatbot is here to assist you with personalized stock recommendations and market analysis.
          </p>
          <Link
            to="/ChatSupport" // Use Link component to navigate
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
