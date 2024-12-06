import React, { useState, useEffect } from 'react';
// import './';
const Toast = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div className="fixed bottom-8 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        <p>{message}</p>
      </div>
    )
  );
};

export default Toast;
