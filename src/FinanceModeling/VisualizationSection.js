
import React from "react";
import { Line } from "react-chartjs-2";

const VisualizationSection = ({ data }) => {
  const chartData = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [
      {
        label: "Cash Flow Projection",
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Cash Flow Projection</h2>
      <Line data={chartData} />
    </div>
  );
};

export default VisualizationSection;
