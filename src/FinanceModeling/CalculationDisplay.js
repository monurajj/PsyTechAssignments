import React from "react";

const CalculationDisplay = ({ metrics }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Calculated Metrics</h2>
      <ul className="space-y-2">
        {Object.entries(metrics).map(([key, value]) => (
          <li key={key} className="text-sm">
            <span className="font-medium">{key}: </span>${value.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalculationDisplay;
