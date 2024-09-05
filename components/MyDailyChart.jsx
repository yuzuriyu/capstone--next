"use client";

import React, { useContext, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { VoltageContext } from "../context/VoltageContext";
import VoltageChartInfo from "./VoltageChartInfo";
import MyWeeklyChart from "./MyWeeklyChart";
import MyLast6DaysChart from "./MyLast6DaysChart";

const MyDailyChart = () => {
  const { voltageData } = useContext(VoltageContext);
  const [dailyData, setDailyData] = useState([]);
  const [isChartInfoOpen, setIsChartInfoOpen] = useState(false);
  const [activeChart, setActiveChart] = useState("daily");

  const toggleChartInfo = () => {
    setIsChartInfoOpen((prevStatus) => !prevStatus);
  };

  const handleChartChange = (e) => {
    setActiveChart(e.target.value);
  };

  useEffect(() => {
    const updateDailyData = () => {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      if (voltageData && voltageData.length > 0) {
        const dataForToday = voltageData
          .flatMap((dayData) => dayData.voltages)
          .filter(
            (reading) =>
              new Date(reading.timestamp) >= startOfDay &&
              new Date(reading.timestamp) <= endOfDay
          )
          .map((reading) => ({
            time: new Date(reading.timestamp).toLocaleTimeString(),
            voltage: reading.voltage,
          }));

        // Keep only the most recent 60 data points
        const slicedData = dataForToday.slice(-60);
        setDailyData(slicedData);
      } else {
        // Default data for when there's no voltage data available
        setDailyData([]);
      }
    };

    // Update the data when voltageData changes
    updateDailyData();

    // Reset data at 11:59 PM
    const resetTime = new Date();
    resetTime.setHours(23, 59, 59, 999);

    const timeoutId = setTimeout(() => {
      setDailyData([]);
      updateDailyData(); // To start collecting data for the new day
    }, resetTime.getTime() - new Date().getTime());

    // Cleanup timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [voltageData]);

  const placeholderData = [{ time: "No Data", voltage: 0 }];

  return (
    <div className="w-full bg-white py-4 px-4 rounded-lg mb-8">
      <div className="flex justify-end relative mb-2">
        <button
          className="text-sm text-customgreen"
          onClick={() => toggleChartInfo()}
        >
          {isChartInfoOpen ? "Hide Details" : "View Details"}
        </button>
        {isChartInfoOpen && <VoltageChartInfo />}
      </div>
      {activeChart === "daily" && (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={dailyData.length > 0 ? dailyData : placeholderData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="voltage"
              stroke="#B0BEC5"
              fill="#B0BEC5"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {activeChart === "last6days" && <MyLast6DaysChart />}
      {activeChart === "weekly" && <MyWeeklyChart />}
      <div className="flex gap-4">
        <div>
          <input
            type="radio"
            id="daily"
            value="daily"
            checked={activeChart === "daily"}
            onChange={handleChartChange}
            className="mr-2"
          />
          <label htmlFor="daily" className="text-text-gray text-xs">
            Daily
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="last6days"
            value="last6days"
            checked={activeChart === "last6days"}
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
  );
};

export default MyDailyChart;
