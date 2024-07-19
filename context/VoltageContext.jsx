"use client";

import React, { useEffect, useState, createContext } from "react";
import { useSession } from "next-auth/react";

const VoltageContext = createContext();

const VoltageContextProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [latestRecord, setLatestRecord] = useState(null);
  const [voltageData, setVoltageData] = useState([]);
  const [totalAccumulatedVoltage, setTotalAccumulatedVoltage] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [averageVoltage, setAverageVoltage] = useState(0);
  const [voltageRange, setVoltageRange] = useState({ min: null, max: null });
  const [voltagePercentageChange, setVoltagePercentageChange] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.voltages) {
      setVoltageData(session.user.voltages);
    }
  }, [status, session]);

  useEffect(() => {
    let totalVoltage = 0;
    let stepsCount = 0;
    let minVoltage = Infinity;
    let maxVoltage = -Infinity;
    let previousVoltage = null;
    let percentageChanges = [];

    voltageData.forEach((item) => {
      item.voltages.forEach((voltageObj) => {
        if (voltageObj && typeof voltageObj.voltage === "number") {
          totalVoltage += voltageObj.voltage;
          stepsCount += 1;
          if (voltageObj.voltage < minVoltage) minVoltage = voltageObj.voltage;
          if (voltageObj.voltage > maxVoltage) maxVoltage = voltageObj.voltage;

          if (previousVoltage !== null) {
            const percentageChange =
              ((voltageObj.voltage - previousVoltage) / previousVoltage) * 100;
            const formattedChange = parseFloat(percentageChange.toFixed(2));
            console.log(`Previous Voltage: ${previousVoltage}`);
            console.log(`Current Voltage: ${voltageObj.voltage}`);
            console.log(`Percentage Change: ${formattedChange}`);
            percentageChanges.push(formattedChange);
          }
          previousVoltage = voltageObj.voltage;
        } else {
          console.error("Invalid voltage object:", voltageObj);
        }
      });
    });

    // Calculate average voltage
    const average = stepsCount > 0 ? totalVoltage / stepsCount : 0;

    // Convert to fixed decimal places and then parse it back to float
    totalVoltage = parseFloat(totalVoltage.toFixed(2));
    setTotalAccumulatedVoltage(totalVoltage);
    setTotalSteps(stepsCount);
    setAverageVoltage(parseFloat(average.toFixed(2)));
    setVoltageRange({
      min: minVoltage === Infinity ? null : minVoltage,
      max: maxVoltage === -Infinity ? null : maxVoltage,
    });
    setVoltagePercentageChange(percentageChanges);

    // Set the latest record timestamp if available
    const latestVoltageData = voltageData[voltageData.length - 1];
    if (latestVoltageData && latestVoltageData.voltages.length > 0) {
      const latestTimestamp =
        latestVoltageData.voltages[latestVoltageData.voltages.length - 1]
          .timestamp;
      const formattedTimestamp = new Date(latestTimestamp).toLocaleString();
      setLatestRecord(formattedTimestamp);
    }
  }, [voltageData]);

  return (
    <VoltageContext.Provider
      value={{
        voltageData,
        latestRecord,
        totalAccumulatedVoltage,
        totalSteps,
        averageVoltage,
        voltageRange,
        voltagePercentageChange,
      }}
    >
      {children}
    </VoltageContext.Provider>
  );
};

export default VoltageContextProvider;
export { VoltageContext, VoltageContextProvider };
