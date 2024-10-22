import React, { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { VoltageContext } from "../context/VoltageContext";

const COLORS = [
  "#192524", // Dark Charcoal
  "#3C5759", // Deep Slate Green
  "#959D90", // Sage Gray
  "#D1EBDB", // Light Mint Green
  "#D0D5CE", // Pale Gray Green
  "#EFECE9", // Soft Beige
];

const MyLast6DaysChart = () => {
  const { voltageData } = useContext(VoltageContext);
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    if (!voltageData || voltageData.length === 0) {
      console.error("No voltage data available.");
      return;
    }

    const today = new Date();
    const sixDaysAgo = new Date(today);
    sixDaysAgo.setDate(today.getDate() - 6);

    // Initialize data structure to accumulate voltage totals for each day of the week
    const dayTotals = {};

    voltageData.forEach((dayData) => {
      dayData.voltages.forEach((voltage) => {
        const voltageDate = new Date(voltage.timestamp);

        if (voltageDate >= sixDaysAgo && voltageDate <= today) {
          const dayName = voltageDate.toLocaleDateString("en-US", {
            weekday: "short",
          });

          // Sum all voltages for the same day
          if (dayTotals[dayName]) {
            dayTotals[dayName] += voltage.voltage;
          } else {
            dayTotals[dayName] = voltage.voltage;
          }
        }
      });
    });

    // Convert dayTotals object to an array of objects for the chart and round totalVoltage to 2 decimals
    const formattedData = Object.keys(dayTotals).map((day) => ({
      day,
      totalVoltage: parseFloat(dayTotals[day].toFixed(2)), // Round to 2 decimals
    }));

    console.log("Aggregated data:", formattedData);

    setAggregatedData(formattedData);
  }, [voltageData]);

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
    <div className="w-full bg-white py-4 px-4 rounded-lg mb-8">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={aggregatedData}
            dataKey="totalVoltage"
            nameKey="day"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ day, totalVoltage }) => `${day}: ${totalVoltage} V`} // Add 'V' to the label
          >
            {aggregatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)} V`} />{" "}
          {/* Add 'V' to the tooltip */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLast6DaysChart;
