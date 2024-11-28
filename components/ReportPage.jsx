"use client";

import React from "react";
import dynamic from "next/dynamic";
import UserReport from "./UserReport";

// Dynamically import the PDFDownloadLink and Document components
const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const ReportPage = ({
  userData,
  totalAccumulatedVoltage,
  latestRecord,
  totalSteps,
  averageVoltage,
  peakVoltage,
  standardDeviation,
  voltageData,
}) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Convert to a readable string like "10/22/2024, 1:05:57 PM"
  };

  // Transform the voltageData into the desired format
  const transformedData = voltageData.flatMap((day) =>
    day.voltages.map((entry) => ({
      timestamp: formatTimestamp(entry.timestamp), // Format the timestamp
      voltage: entry.voltage, // Keep the voltage value
      psi: entry.psi, // Keep the psi value
    }))
  );

  const user = {
    name: userData.username,
    profilePicture: "/images/profile--default.jpg",
  };

  const summary = {
    totalVoltage: totalAccumulatedVoltage,
    totalSteps: totalSteps,
    averageVoltage: averageVoltage,
    peakVoltage: peakVoltage,
    standardDeviation: standardDeviation,
    latestRecord: latestRecord,
  };

  const filteredData = transformedData.slice(0, 10); // Get the first 15 entries

  return (
    <div style={{ padding: "20px", border: "1px" }}>
      {/* Render PDFDownloadLink only if it's client-side */}
      {DynamicPDFDownloadLink && (
        <DynamicPDFDownloadLink
          document={
            <UserReport user={user} summary={summary} data={filteredData} />
          }
          fileName="user_report.pdf"
        >
          {({ loading }) => (
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {loading ? "Generating Report..." : "Download User Report"}
            </button>
          )}
        </DynamicPDFDownloadLink>
      )}
    </div>
  );
};

export default ReportPage;
