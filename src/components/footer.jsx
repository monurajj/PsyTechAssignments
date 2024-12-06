import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Icons for contact details

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center mb-4">
              <FaPhone className="text-blue-500 mr-3" size={20} />
              <p className="text-lg">+9876543210</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-blue-500 mr-3" size={20} />
              <p className="text-lg">company@psytech.ai</p>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-blue-500 mr-3" size={20} />
              <p className="text-lg">A-15, Second Floor South Extension Part 2 , Delhi, Delhi, India - 110049</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/company/psytechai/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              <FaLinkedin size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              <FaTwitter size={30} />
            </a>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About PsytechStocks</h3>
            <p className="text-gray-400">
              PsytechStocks is dedicated to empowering investors with cutting-edge tools, market insights, and AI-driven analytics to help you make smarter investment decisions.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} PsytechStocks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
