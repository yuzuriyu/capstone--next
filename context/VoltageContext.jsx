"use client";

import React, { useEffect, useState, createContext } from "react";
import { useSession } from "next-auth/react";

const VoltageContext = createContext();

const VoltageContextProvider = ({ children, readings }) => {
  const { data: session, status } = useSession();
  const [latestRecord, setLatestRecord] = useState(null);
  const [voltageData, setVoltageData] = useState([]);
  const [totalAccumulatedVoltage, setTotalAccumulatedVoltage] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [averageVoltage, setAverageVoltage] = useState(0);
  const [standardDeviation, setStandardDeviation] = useState(0);
  const [totalVoltageChange, setTotalVoltageChange] = useState(0);
  const [peakVoltage, setPeakVoltage] = useState(0);
  const [medianVoltage, setMedianVoltage] = useState(0);

  useEffect(() => {
    if (readings && Array.isArray(readings.voltages)) {
      setVoltageData(readings.voltages);
    } else if (status === "authenticated" && session?.user?.voltages) {
      setVoltageData(session.user.voltages);
    }
  }, [status, session, readings]);

  useEffect(() => {
    if (voltageData.length > 0) {
      try {
        let totalVoltage = 0;
        let stepsCount = 0;
        let voltagesArray = [];
        let firstVoltage = null;
        let lastVoltage = null;

        voltageData.forEach((dayRecord) => {
          if (Array.isArray(dayRecord.voltages)) {
            dayRecord.voltages.forEach((voltageObj) => {
              if (voltageObj && typeof voltageObj.voltage === "number") {
                voltagesArray.push(voltageObj.voltage);
                totalVoltage += voltageObj.voltage;
                stepsCount += 1;
                if (firstVoltage === null) firstVoltage = voltageObj.voltage;
                lastVoltage = voltageObj.voltage;
              } else {
                console.error("Invalid voltage object:", voltageObj);
              }
            });
          }
        });

        // Only calculate if we have valid data
        if (stepsCount > 0) {
          const average = totalVoltage / stepsCount;

          const variance =
            voltagesArray.reduce(
              (acc, val) => acc + Math.pow(val - average, 2),
              0
            ) / stepsCount;
          const stdDeviation = Math.sqrt(variance);

          const voltageChange =
            firstVoltage !== null && lastVoltage !== null
              ? lastVoltage - firstVoltage
              : 0;

          const peak = Math.max(...voltagesArray);

          voltagesArray.sort((a, b) => a - b);
          const mid = Math.floor(voltagesArray.length / 2);
          const median =
            voltagesArray.length % 2 !== 0
              ? voltagesArray[mid]
              : (voltagesArray[mid - 1] + voltagesArray[mid]) / 2;

          setTotalAccumulatedVoltage(parseFloat(totalVoltage.toFixed(2)));
          setTotalSteps(stepsCount);
          setAverageVoltage(parseFloat(average.toFixed(2)));
          setStandardDeviation(parseFloat(stdDeviation.toFixed(2)));
          setTotalVoltageChange(parseFloat(voltageChange.toFixed(2)));
          setPeakVoltage(parseFloat(peak.toFixed(2)));
          setMedianVoltage(parseFloat(median.toFixed(2)));

          // Update the latest record timestamp
          const latestVoltageData = voltageData[voltageData.length - 1];
          if (latestVoltageData && latestVoltageData.voltages.length > 0) {
            const latestTimestamp =
              latestVoltageData.voltages[latestVoltageData.voltages.length - 1]
                .timestamp;
            setLatestRecord(new Date(latestTimestamp).toLocaleString());
          }
        }
      } catch (error) {
        console.error("Error processing voltage data:", error);
      }
    }
  }, [voltageData]);

  console.log(voltageData);

  console.log(totalAccumulatedVoltage);
  return (
    <VoltageContext.Provider
      value={{
        voltageData,
        latestRecord,
        totalAccumulatedVoltage,
        totalSteps,
        averageVoltage,
        standardDeviation,
        totalVoltageChange,
        peakVoltage,
        medianVoltage,
      }}
    >
      {children}
    </VoltageContext.Provider>
  );
};

export default VoltageContextProvider;
export { VoltageContext, VoltageContextProvider };
