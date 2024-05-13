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
        const res = await fetch(
          "https://next-structure-chi.vercel.app/api/voltages",
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        console.log(data);

        setVoltageData(data);
      } catch (error) {
        console.error("Error fetching voltage data:", error);
      }
    };

    fetchVoltageData();
  }, []);

  useEffect(() => {
    let totalVoltage = 0;
    voltageData.forEach((item) => {
      item.voltages.forEach((voltageObj) => {
        if (voltageObj && typeof voltageObj.voltage === "number") {
          totalVoltage += voltageObj.voltage;
        } else {
          console.error("Invalid voltage object:", voltageObj);
        }
      });
    });
    // Convert to fixed decimal places and then parse it back to float
    totalVoltage = parseFloat(totalVoltage.toFixed(2));
    setTotalAccumulatedVoltage(totalVoltage);
    console.log("Calculated Total Voltage:", totalVoltage);
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
