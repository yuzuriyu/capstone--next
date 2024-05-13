import React, { createContext } from "react";
import useSWR from "swr";

const VoltageContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoltageContextProvider = ({ children }) => {
  const { data: voltageData, error } = useSWR(
    "https://next-structure-chi.vercel.app/api/voltages",
    fetcher,
    { refreshInterval: 5000 } // Refresh every 5 seconds
  );

  if (error) {
    console.error("Error fetching voltage data:", error);
  }

  let totalAccumulatedVoltage = 0;
  if (voltageData) {
    voltageData.forEach((item) => {
      item.voltages.forEach((voltageObj) => {
        if (voltageObj && typeof voltageObj.voltage === "number") {
          totalAccumulatedVoltage += voltageObj.voltage;
        } else {
          console.error("Invalid voltage object:", voltageObj);
        }
      });
    });
    // Convert to fixed decimal places and then parse it back to float
    totalAccumulatedVoltage = parseFloat(totalAccumulatedVoltage.toFixed(2));
    console.log("Calculated Total Voltage:", totalAccumulatedVoltage);
  }

  return (
    <VoltageContext.Provider
      value={{
        voltageData,
        totalAccumulatedVoltage,
      }}
    >
      {children}
    </VoltageContext.Provider>
  );
};

export default VoltageContextProvider;
export { VoltageContext, VoltageContextProvider };
