"use client";
import React, { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { VoltageContext } from "../context/VoltageContext";
import StepsChartInfo from "./StepsChartInfo";
import { ClipLoader } from "react-spinners";

const StepsChart = () => {
  const { voltageData, totalSteps } = useContext(VoltageContext);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [isStepChartInfoOpen, setIsStepChartInfoOpen] = useState(false);

  useEffect(() => {
    if (voltageData && voltageData.length > 0) {
      const data = voltageData.reduce((accumulator, dayData) => {
        accumulator.push({ name: dayData.day, value: dayData.voltages.length });
        return accumulator;
      }, []);
      setAggregatedData(data);
    }
  }, [voltageData]);

  const toggleStepChartInfo = () => {
    setIsStepChartInfoOpen((prevStatus) => !prevStatus);
  };

  if (!aggregatedData || aggregatedData.length === 0) {
    return null;
  }

  return (
    <div className="w-10/12 m-auto md:border-r md:col-span-1 col-span-2 md:pr-6 pb-6 md:pb-0 md:border-b-0 border-b mt-12">
      <div className="flex justify-between relative">
        <div>
          <p className="text-sm">Total Steps</p>
          <p className="text-lg font-bold mt-2">{totalSteps}</p>
        </div>

        <button
          className="rounded-lg text-sm shadow px-3 text-customblue py-1"
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
