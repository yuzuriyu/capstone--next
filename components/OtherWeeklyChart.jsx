"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OtherWeeklyChart = ({ userVoltage }) => {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    if (!userVoltage || userVoltage.voltages.length === 0) {
      console.error("No voltage data available.");
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
    const currentYear = currentDate.getFullYear();

    const weeklyAggregatedData = Array(4)
      .fill()
      .map((_, index) => ({
        week: `Week ${index + 1}`,
        totalVoltage: 0,
      }));

    userVoltage.voltages.forEach((dayData) => {
      dayData.voltages.forEach((voltage) => {
        const voltageDate = new Date(voltage.timestamp);
        const voltageMonth = voltageDate.getMonth() + 1;
        const voltageYear = voltageDate.getFullYear();

        if (voltageMonth === currentMonth && voltageYear === currentYear) {
          let weekInMonth = Math.ceil(voltageDate.getDate() / 7);
          weekInMonth = Math.min(weekInMonth, weeklyAggregatedData.length); // Ensure weekInMonth is within bounds

          if (weeklyAggregatedData[weekInMonth - 1]) {
            // Accumulate the total voltage and round to 2 decimals
            weeklyAggregatedData[weekInMonth - 1].totalVoltage +=
              voltage.voltage;
            weeklyAggregatedData[weekInMonth - 1].totalVoltage = parseFloat(
              weeklyAggregatedData[weekInMonth - 1].totalVoltage.toFixed(2)
            );
          } else {
            console.error("Week not found:", weekInMonth);
          }
        }
      });
    });

    console.log("Aggregated Data:", weeklyAggregatedData);
    setAggregatedData(weeklyAggregatedData);
  }, [userVoltage]);

  if (!aggregatedData || aggregatedData.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={aggregatedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip formatter={(value) => `${value.toFixed(2)}V`} fontSize={12} />
        <Legend fontSize={12} />
        <Area
          type="monotone"
          dataKey="totalVoltage"
          stroke="#B0BEC5"
          fill="#B0BEC5"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OtherWeeklyChart;
