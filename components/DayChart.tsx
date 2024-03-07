"use client";

import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { VoltageContext } from "../context/VoltageContext";

const DayChart = () => {
  const { voltageData, totalAccumulatedVoltage } = useContext(VoltageContext);

  if (!voltageData) {
    return <div>Loading...</div>;
  }

  const transformedData = voltageData.map((item: any) => ({
    day: item.day,
    voltage: item.voltages[0], // Assuming there's only one voltage reading per day
  }));

  return (
    <div className="w-11/12 m-auto py-10 md:w-10/12">
      <div className="border-b border-darkblue mb-4">
        <h1 className="">Total Energy Accumulated</h1>
        <p className="my-2 text-xl"> {totalAccumulatedVoltage}</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" fontSize={12} /> {/* Adjust font size here */}
          <YAxis fontSize={12} /> {/* Adjust font size here */}
          {/* <Tooltip fontSize={12} /> Adjust font size here */}
          <Legend fontSize={12} /> {/* Adjust font size here */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="voltage"
            stroke="#FFA500" // Orange color
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DayChart;
