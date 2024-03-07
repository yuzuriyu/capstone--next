"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { VoltageContext } from "../context/VoltageContext";

const Device = () => {
  const { latestRecord } = useContext(VoltageContext);

  // Use state to store the latest voltage and previous voltages, trigger re-renders
  const [voltages, setVoltages] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    // Update the voltages when latestRecord changes
    if (latestRecord) {
      // Shift the latest voltage to previous positions
      setVoltages((prevVoltages) => [
        latestRecord.voltage,
        prevVoltages[0],
        prevVoltages[1],
        prevVoltages[2],
        prevVoltages[3],
      ]);
    }
  }, [latestRecord]);

  // Create data array with the latest and previous voltages
  const data = [
    { device: "Latest", voltage: voltages[0] },
    { device: "Previous", voltage: voltages[1] },
    { device: "3rd Last", voltage: voltages[2] },
    { device: "4th Last", voltage: voltages[3] },
    { device: "5th Last", voltage: voltages[4] },
  ];

  return (
    <div className="w-full m-auto md:m-0 lg:w-1/2">
      <h1>Device</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="device" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="voltage" fill="skyblue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Device;
