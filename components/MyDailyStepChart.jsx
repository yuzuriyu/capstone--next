"use client";

import React, { useContext, useState, useEffect } from "react";
import { VoltageContext } from "../context/VoltageContext";

const MyDailyStepChart = () => {
  const { voltageData } = useContext(VoltageContext);
  const [totalSteps, setTotalSteps] = useState(0);
  const [goal, setGoal] = useState(100); // Start with the first goal

  const stepGoals = [100, 500, 1000, 2000, 3000, 4000, 5000, 10000];

  useEffect(() => {
    if (voltageData && voltageData.length > 0) {
      // Calculate the total steps for the day
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const stepsForToday = voltageData.reduce((acc, dayData) => {
        return (
          acc +
          dayData.voltages.filter(
            (reading) =>
              new Date(reading.timestamp) >= startOfDay &&
              new Date(reading.timestamp) <= endOfDay
          ).length
        );
      }, 0);

      setTotalSteps(stepsForToday);

      // Find the next goal based on the current step count
      const nextGoal = stepGoals.find((goal) => stepsForToday < goal) || 10000;
      setGoal(nextGoal);
    }
  }, [voltageData]);

  return (
    <div className="w-full bg-white py-4 px-4 rounded-lg mb-8">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-sm mb-2">Today's Step Count</h2>
        <p className="text-4xl font-bold text-customgreen">{totalSteps}</p>
        <div className="w-full mt-4 bg-gray-200 rounded-full h-4">
          <div
            className="bg-customgreen h-4 rounded-full"
            style={{ width: `${Math.min(totalSteps / goal, 1) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Goal: {goal} steps</p>
      </div>
    </div>
  );
};

export default MyDailyStepChart;
