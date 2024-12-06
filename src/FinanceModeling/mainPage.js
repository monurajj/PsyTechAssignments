import React, { useState, useEffect } from "react";
import InputSection from "./InputSection";
import Slider from "./Slider";
import VisualizationSection from "./VisualizationSection";
import CalculationDisplay from "./CalculationDisplay";

const MainPage = () => {
  const [inputs, setInputs] = useState({
    revenue: 0,
    cogs: 0,
    opex: 0,
    taxes: 0,
  });

  const [growthRate, setGrowthRate] = useState(10);
  const [metrics, setMetrics] = useState({});
  const [projection, setProjection] = useState([]);

  useEffect(() => {
    const { revenue, cogs, opex, taxes } = inputs;

    // Calculate EBITDA and other metrics
    const ebitda = revenue - cogs - opex;
    const profitMargin = (ebitda / revenue) * 100;
    const cashFlow = ebitda * (1 - taxes / 100);

    // Project future cash flows
    const futureProjections = Array(5)
      .fill(cashFlow)
      .map((val, i) => val * (1 + growthRate / 100) ** i);

    setMetrics({ EBITDA: ebitda, "Profit Margin": profitMargin, "Cash Flow": cashFlow });
    setProjection(futureProjections);
  }, [inputs, growthRate]);

  return (
    <div className="p-8 space-y-8">
      <InputSection inputs={inputs} setInputs={setInputs} />
      <Slider
        label="Growth Rate (%)"
        value={growthRate}
        onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
      />
      <CalculationDisplay metrics={metrics} />
      <VisualizationSection data={projection} />
    </div>
  );
};

export default MainPage;
