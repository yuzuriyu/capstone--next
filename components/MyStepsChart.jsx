import React, { useContext, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { VoltageContext } from "../context/VoltageContext";
import StepsChartInfo from "./StepsChartInfo";
import { ClipLoader } from "react-spinners";

const MyStepsChart = () => {
  const { voltageData } = useContext(VoltageContext);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [isStepChartInfoOpen, setIsStepChartInfoOpen] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);

  const COLORS = [
    "#192524", // Dark Charcoal
    "#3C5759", // Deep Slate Green
    "#959D90", // Sage Gray
    "#D1EBDB", // Light Mint Green
    "#D0D5CE", // Pale Gray Green
    "#EFECE9", // Soft Beige
  ];

  useEffect(() => {
    if (voltageData && voltageData.length > 0) {
      const today = new Date();
      const sixDaysAgo = new Date(today);
      sixDaysAgo.setDate(today.getDate() - 6);

      const filteredData = voltageData.filter((dayData) => {
        // Flatten all voltages arrays into a single array
        const allVoltages = dayData.voltages;
        const dayHasValidData = allVoltages.some((voltage) => {
          const dayDate = new Date(voltage.timestamp);
          if (isNaN(dayDate)) {
            console.error("Timestamp missing or invalid:", voltage);
            return false;
          }
          return dayDate >= sixDaysAgo && dayDate <= today;
        });
        return dayHasValidData;
      });

      const total = filteredData.reduce((accumulator, dayData) => {
        return accumulator + dayData.voltages.length;
      }, 0);
      setTotalSteps(total);

      const data = filteredData.map((dayData, index) => ({
        name: dayData.day,
        value: dayData.voltages.length,
        color: COLORS[index % COLORS.length],
      }));
      setAggregatedData(data);
    }
  }, [voltageData]);

  const toggleStepChartInfo = () => {
    setIsStepChartInfoOpen((prevStatus) => !prevStatus);
  };

  if (!aggregatedData || aggregatedData.length === 0) {
    return <ClipLoader color="#2FBFDE" loading={true} />;
  }

  return (
    <div className="w-full bg-white py-4 px-4 rounded-lg">
      <div className="flex justify-end relative">
        <button
          className=" text-customgreen text-sm"
          onClick={() => toggleStepChartInfo()}
        >
          {isStepChartInfoOpen ? "Hide Details" : "View Details"}
        </button>
        {isStepChartInfoOpen && <StepsChartInfo />}
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie dataKey="value" data={aggregatedData} label>
              {aggregatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyStepsChart;
