"use client";

import React, { useEffect, useState, createContext } from "react";

const OtherVoltageContext = createContext();

const OtherVoltageContextProvider = ({ user, children }) => {
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
    if (user?.voltages) {
      setVoltageData(user.voltages);
    }
  }, [user]);

  useEffect(() => {
    let totalVoltage = 0;
    let stepsCount = 0;
    let voltagesArray = [];
    let firstVoltage = null;
    let lastVoltage = null;

    voltageData.forEach((item) => {
      item.voltages.forEach((voltageObj) => {
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
    });

    const average = stepsCount > 0 ? totalVoltage / stepsCount : 0;

    const variance =
      voltagesArray.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) /
      stepsCount;
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

    totalVoltage = parseFloat(totalVoltage.toFixed(2));
    setTotalAccumulatedVoltage(totalVoltage);
    setTotalSteps(stepsCount);
    setAverageVoltage(parseFloat(average.toFixed(2)));
    setStandardDeviation(parseFloat(stdDeviation.toFixed(2)));
    setTotalVoltageChange(parseFloat(voltageChange.toFixed(2)));
    setPeakVoltage(parseFloat(peak.toFixed(2)));
    setMedianVoltage(parseFloat(median.toFixed(2)));

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
    <OtherVoltageContext.Provider
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
    </OtherVoltageContext.Provider>
  );
};
export default OtherVoltageContextProvider;

export { OtherVoltageContext, OtherVoltageContextProvider };
