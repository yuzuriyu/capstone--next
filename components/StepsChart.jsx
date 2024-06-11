import React, { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { VoltageContext } from "../context/VoltageContext";
import StepsChartInfo from "./StepsChartInfo";
import { ClipLoader } from "react-spinners";

const StepsChart = () => {
  const { voltageData } = useContext(VoltageContext);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [isStepChartInfoOpen, setIsStepChartInfoOpen] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0); // State to hold the total steps

  useEffect(() => {
    if (voltageData && voltageData.length > 0) {
      // Calculate total steps
      const total = voltageData.reduce((accumulator, dayData) => {
        return accumulator + dayData.voltages.length;
      }, 0);
      setTotalSteps(total);

      // Aggregate data for the PieChart
      const data = voltageData.map((dayData) => ({
        name: dayData.day,
        value: dayData.voltages.length,
      }));
      setAggregatedData(data);
    }
  }, [voltageData]);

  const toggleStepChartInfo = () => {
    setIsStepChartInfoOpen((prevStatus) => !prevStatus);
  };

  // If data is still loading, return a loading spinner
  if (!aggregatedData || aggregatedData.length === 0) {
    return <ClipLoader color="#2FBFDE" loading={true} />;
  }

  return (
    <div className="w-full bg-white py-4 px-4 rounded-lg">
      <div className="flex justify-between relative">
        <div>
          <p className=" font-bold">{totalSteps}</p>
        </div>

        <button
          className=" text-customgreen text-sm"
          onClick={() => toggleStepChartInfo()}
        >
          {isStepChartInfoOpen ? "Hide Details" : "View Details"}
        </button>
        {isStepChartInfoOpen && <StepsChartInfo />}
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie dataKey="value" data={aggregatedData} fill="#2FBFDE" label />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StepsChart;
