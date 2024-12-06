import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/stock.jpg";
import { FaBars, FaTimes, FaUser, FaCaretDown } from "react-icons/fa";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (email && token) {
      const firstWord = email.split("@")[0];
      setUserEmail(firstWord);
    } else {
      setUserEmail(null);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUserEmail(null);
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <Link to="/" className="flex items-center">
            <img
              src={logoImage}
              alt="PsytechStocks Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="ml-3 text-2xl font-bold text-white">
              PsytechStocks
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-white">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/analysis" className="hover:underline">
              Stock Analysis
            </Link>
          </li>
          <li>
            <Link to="/yourfinancialmodeling" className="hover:underline">
              Try Financial Modeling
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/ChatSupport" className="hover:underline">
              ChatSupport
            </Link>
          </li>
          {userEmail ? (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2"
              >
                <FaUser />
                <span>{userEmail}</span>
                <FaCaretDown />
              </button>
              {isProfileMenuOpen && (
                <div
                  ref={profileMenuRef}
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
                >
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link to="/signin" className="hover:underline">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-green-500 text-white">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/analysis" className="hover:underline">
                Stock Analysis
              </Link>
            </li>
            <li>
            <Link to="/yourfinancialmodeling" className="hover:underline">
              Try Financial Modeling
            </Link>
          </li>
            <li>
              <Link to="/ChatSupport" className="hover:underline">
                ChatSupport
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            {userEmail ? (
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black bg-white rounded"
              >
                Sign Out
              </button>
            ) : (
              <>
                <li>
                  <Link to="/signin" className="hover:underline">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
