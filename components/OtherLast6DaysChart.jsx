"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#192524", // Dark Charcoal
  "#3C5759", // Deep Slate Green
  "#959D90", // Sage Gray
  "#D1EBDB", // Light Mint Green
  "#D0D5CE", // Pale Gray Green
  "#EFECE9", // Soft Beige
];

const OtherLast6DaysChart = ({ userVoltage }) => {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    if (!userVoltage || userVoltage.voltages.length === 0) {
      console.error("No voltage data available.");
      return;
    }

    const today = new Date();
    const sixDaysAgo = new Date(today);
    sixDaysAgo.setDate(today.getDate() - 6);

    const dayTotals = {};

    // Loop through each day's voltage data
    userVoltage.voltages.forEach((dayData) => {
      dayData.voltages.forEach((voltage) => {
        const voltageDate = new Date(voltage.timestamp);

        // Check if the voltage reading is within the last 6 days
        if (voltageDate >= sixDaysAgo && voltageDate <= today) {
          const dayName = voltageDate.toLocaleDateString("en-US", {
            weekday: "short",
          });

          // Sum up voltages for each day and round to 2 decimals
          dayTotals[dayName] = (dayTotals[dayName] || 0) + voltage.voltage;
          dayTotals[dayName] = parseFloat(dayTotals[dayName].toFixed(2));
        }
      });
    });

    // Prepare the data for the chart
    const formattedData = Object.keys(dayTotals).map((day, index) => ({
      day,
      totalVoltage: dayTotals[day],
      color: COLORS[index % COLORS.length],
    }));

    console.log("Aggregated data:", formattedData);

    setAggregatedData(formattedData);
  }, [userVoltage]);

  if (!aggregatedData || aggregatedData.length === 0) {
    return (
      <div className="w-full bg-white py-4 px-4 rounded-lg mb-8">
        <p className="text-center text-sm">
          No data available for the last 6 days
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={aggregatedData}
          dataKey="totalVoltage"
          nameKey="day"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label={({ day, totalVoltage }) =>
            `${day}: ${totalVoltage.toFixed(2)}V`
          }
        >
          {aggregatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value.toFixed(2)}V`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OtherLast6DaysChart;
