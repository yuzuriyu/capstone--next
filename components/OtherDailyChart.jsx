"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import VoltageChartInfo from "./VoltageChartInfo";
import OtherWeeklyChart from "./OtherWeeklyChart";
import OtherLast6DaysChart from "./OtherLast6DaysChart";

const OtherDailyChart = ({ userVoltage }) => {
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
      const today = new Date().getDay();
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const todayString = daysOfWeek[today];

      if (userVoltage && userVoltage.voltages.length > 0) {
        const todayData = userVoltage.voltages.find(
          (dayData) => dayData.day === todayString
        );

        if (todayData && todayData.voltages.length > 0) {
          const dataForToday = todayData.voltages.map((reading) => ({
            time: new Date(reading.timestamp).toLocaleTimeString(),
            voltage: parseFloat(reading.voltage.toFixed(2)), // Round to 2 decimals
          }));

          // Keep only the most recent 60 data points
          const slicedData = dataForToday.slice(-60);
          setDailyData(slicedData);
        } else {
          setDailyData([]);
        }
      } else {
        // Default data for when there's no voltage data available
        setDailyData([]);
      }
    };

    // Update the data initially
    updateDailyData();

    // Set an interval to update the data periodically (every minute)
    const intervalId = setInterval(updateDailyData, 60000);

    // Reset data at 11:59 PM
    const resetTime = new Date();
    resetTime.setHours(23, 59, 59, 999);

    const timeoutId = setTimeout(() => {
      setDailyData([]);
      updateDailyData(); // To start collecting data for the new day
    }, resetTime.getTime() - new Date().getTime());

    // Cleanup interval and timeout on unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [userVoltage]);

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
            <Tooltip
              formatter={(value) => `${value.toFixed(2)}V`} // Tooltip shows voltage with 2 decimals and "V"
            />
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
      {activeChart === "last6days" && (
        <OtherLast6DaysChart userVoltage={userVoltage} />
      )}
      {activeChart === "weekly" && (
        <OtherWeeklyChart userVoltage={userVoltage} />
      )}
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

export default OtherDailyChart;
