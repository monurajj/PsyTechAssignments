import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import signInImage from '../assets/authenticationImg.png';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setSuccessMessage('');

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await fetch('https://psy-tech-backend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setGeneralError(data.message || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setGeneralError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen bg-gray-100">
      <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center">
        <img
          src={signInImage}
          alt="Sign Up"
          className="rounded-lg shadow-lg max-w-full h-auto md:h-[80%] md:w-[80%] object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full md:w-[70vh] md:h-[80vh]">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-blue-600">Create an Account</h1>
          <p className="text-center text-gray-600 mb-6 md:mb-8">Join us to get started</p>
          <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-black focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 sm:text-sm border-2 border-gray-300 rounded-md transition duration-150 ease-in-out"
                  placeholder="Email"
                />
              </div>
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-black focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-2 border-gray-300 rounded-md transition duration-150 ease-in-out"
                  placeholder="••••••••"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiFillEye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
            {generalError && (
              <p className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500">
                {generalError}
              </p>
            )}
            {successMessage && (
              <p className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500">
                {successMessage}
              </p>
            )}
          </form>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => navigate('/signin')}
              className="text-sm text-gray-600 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              Already have an account? <span className="text-blue-600 font-medium">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
