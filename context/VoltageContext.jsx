"use client";

import React, { useEffect, useState, createContext } from "react";

const VoltageContext = createContext();

const VoltageContextProvider = ({ children }) => {
  const [latestRecord, setLatestRecord] = useState(0);
  const [voltageData, setVoltageData] = useState([]);
  const [totalAccumulatedVoltage, setTotalAccumulatedVoltage] = useState(0);

  useEffect(() => {
    const fetchVoltageData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/voltages");
        const data = await res.json();
        setVoltageData(data);
      } catch (error) {
        console.error("Error fetching voltage data:", error);
      }
    };

    fetchVoltageData();
  }, []);

  useEffect(() => {
    // Calculate total accumulated voltage
    let totalVoltage = 0;
    voltageData.forEach((item) => {
      item.voltages.forEach((voltage) => {
        totalVoltage += voltage;
      });
    });
    setTotalAccumulatedVoltage(totalVoltage);
  }, [voltageData]);
  console.log(totalAccumulatedVoltage);
  return (
    <VoltageContext.Provider
      value={{
        voltageData,
        latestRecord,
        totalAccumulatedVoltage,
      }}
    >
      {children}
    </VoltageContext.Provider>
  );
};

export default VoltageContextProvider;
export { VoltageContext, VoltageContextProvider };
