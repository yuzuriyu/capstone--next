"use client";

import React, { useContext, useState, useEffect } from "react";
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

const WeeklyChart = () => {
  const { voltageData } = useContext(VoltageContext);
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    if (!voltageData || voltageData.length === 0) {
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

    voltageData.forEach((dayData) => {
      dayData.voltages.forEach((voltage) => {
        const voltageDate = new Date(voltage.timestamp);
        const voltageMonth = voltageDate.getMonth() + 1;
        const voltageYear = voltageDate.getFullYear();

        if (voltageMonth === currentMonth && voltageYear === currentYear) {
          let weekInMonth = Math.ceil(voltageDate.getDate() / 7);
          weekInMonth = Math.min(weekInMonth, weeklyAggregatedData.length); // Ensure weekInMonth is within bounds
          console.log("Voltage:", voltage.voltage);
          console.log(
            "Before increment:",
            weeklyAggregatedData[weekInMonth - 1]?.totalVoltage
          );
          if (weeklyAggregatedData[weekInMonth - 1]) {
            weeklyAggregatedData[weekInMonth - 1].totalVoltage +=
              voltage.voltage;
          } else {
            console.error("Week not found:", weekInMonth);
          }
          console.log(
            "After increment:",
            weeklyAggregatedData[weekInMonth - 1]?.totalVoltage
          );
        }
      });
    });

    console.log("Aggregated Data:", weeklyAggregatedData);
    setAggregatedData(weeklyAggregatedData);
  }, [voltageData]);

  if (!aggregatedData || aggregatedData.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={aggregatedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip fontSize={12} />
        <Legend fontSize={12} />
        <Line
          type="monotone"
          dataKey="totalVoltage"
          stroke="#17a5ce"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;
