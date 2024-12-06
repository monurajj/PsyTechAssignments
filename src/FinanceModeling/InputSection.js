import React from "react";

const InputSection = ({ inputs, setInputs }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Financial Model Inputs</h2>
      <div className="grid gap-4">
        {["Revenue", "COGS", "OPEX", "Taxes"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium">{field}</label>
            <input
              type="number"
              name={field.toLowerCase()}
              value={inputs[field.toLowerCase()] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputSection;
