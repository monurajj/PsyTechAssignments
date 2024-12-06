
import React from "react";

const Slider = ({ label, value, onChange }) => {
  return (
    <div className="my-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={onChange}
        className="w-full"
      />
      <div className="text-sm text-gray-600">Value: {value}%</div>
    </div>
  );
};

export default Slider;
