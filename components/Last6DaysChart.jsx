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
import VoltageChartInfo from "./VoltageChartInfo";
import WeeklyChart from "./WeeklyChart";

const Last6DaysChart = () => {
  const { voltageData, totalAccumulatedVoltage } = useContext(VoltageContext);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [activeChart, setActiveChart] = useState("last 6 days");
  const [isChartInfoOpen, setIsChartInfoOpen] = useState(false);

  useEffect(() => {
    if (voltageData && voltageData.length > 0) {
      const data = voltageData.map((dayData) => {
        const totalVoltage = dayData.voltages.reduce(
          (acc, curr) => acc + curr.voltage,
          0
        );
        return { day: dayData.day, totalVoltage };
      });
      setAggregatedData(data);
    }
  }, [voltageData]);

  const handleChartChange = (e) => {
    setActiveChart(e.target.value);
  };

  if (!aggregatedData || aggregatedData.length === 0) {
    return null;
  }

  const toggleChartInfo = () => {
    setIsChartInfoOpen((prevStatus) => !prevStatus);

    console.log(totalAccumulatedVoltage);
  };
  return (
    <div className="w-full bg-white py-4 px-4 rounded-lg mb-8">
      <div className="flex justify-between relative mb-2">
        <p className="font-bold">{totalAccumulatedVoltage}</p>
        <button
          className="text-sm  text-customgreen"
          onClick={() => toggleChartInfo()}
        >
          {isChartInfoOpen ? "Hide Details" : "View Details"}
        </button>
        {isChartInfoOpen && <VoltageChartInfo />}
      </div>
      <div>
        {activeChart === "last 6 days" && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={aggregatedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend fontSize={12} />
              <Line
                type="monotone"
                dataKey="totalVoltage"
                stroke="#2FBFDE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {activeChart === "weekly" && <WeeklyChart />}
        <div className="flex gap-4">
          <div>
            <input
              type="radio"
              id="last6days"
              value="last 6 days"
              checked={activeChart === "last 6 days"}
              onChange={handleChartChange}
              className="mr-2"
            />
            <label htmlFor="last6days" className="text-text-gray text-xs">
              Last 6 days
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="weekly"
              value="weekly"
              checked={activeChart === "weekly"}
              onChange={handleChartChange}
              className="mr-2"
            />
            <label htmlFor="weekly" className="text-text-gray text-xs">
              Weekly
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Last6DaysChart;
