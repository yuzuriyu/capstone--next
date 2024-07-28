"use client";

import React, { useContext, useEffect, useState } from "react";
import OtherVoltlist from "./OtherVoltlist";
import Image from "next/image";
import OtherStepsChart from "./OtherStepsChart";
import OtherLast6DaysChart from "./OtherLast6DaysChart";
import { VoltageContext } from "@/context/VoltageContext";

const OtherProfile = ({ user, session }) => {
  const {
    totalAccumulatedVoltage,
    latestRecord,
    totalSteps,
    averageVoltage,
    peakVoltage,
    standardDeviation,
  } = useContext(VoltageContext);
  const [activeCategory, setActiveCategory] = useState("voltage");

  return (
    <>
      <div className="relative h-[330px] w-full">
        <Image
          src={user?.coverPhoto}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute w-11/12 lg:w-8/12 bottom-0 left-1/2 -translate-x-1/2 flex">
          <Image
            src={user?.profilePicture}
            alt=""
            height={160}
            width={160}
            className="align-baseline"
          />
          <div className="flex relative">
            <p className="text-lg font-bold ml-6 absolute bottom-4 text-white w-[150px]">
              {user?.username}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 flex items-center justify-center gap-12">
        <p
          className={`text-sm cursor-pointer ${
            activeCategory === "voltage" ? "text-customgreen" : ""
          }`}
          onClick={() => setActiveCategory("voltage")}
        >
          Voltage
        </p>
        <p
          className={`text-sm cursor-pointer ${
            activeCategory === "steps" ? "text-customgreen" : ""
          }`}
          onClick={() => setActiveCategory("steps")}
        >
          Steps
        </p>
      </div>
      <div className="w-full h-full py-8">
        <div className="w-11/12 lg:w-8/12 m-auto lg:flex-row flex-col flex gap-8">
          <div className="w-full lg:w-[40%]">
            <div className="rounded-lg py-4 px-4 bg-white mb-8">
              <p className="text-sm">{user?.bio}</p>
            </div>
            <div className="bg-white rounded-lg py-4 px-4 grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-customgreen text-center mb-2">
                  {totalAccumulatedVoltage}
                </p>
                <p className="text-xs text-center">Total Voltage</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">
                  {totalSteps}
                </p>
                <p className="text-xs text-center">Total Steps</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">
                  {averageVoltage}
                </p>
                <p className="text-xs text-center">Average Voltage</p>
              </div>
            </div>
            <div className="bg-white rounded-lg py-4 px-4 grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-customgreen text-center mb-2">
                  {latestRecord}
                </p>
                <p className="text-xs text-center">Latest Record</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">
                  {peakVoltage}
                </p>
                <p className="text-xs text-center">Peak Voltage</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">
                  {standardDeviation}
                </p>
                <p className="text-xs text-center">Standard Deviation</p>
              </div>
            </div>
          </div>

          <div className="lg:flex-1 flex flex-col">
            {activeCategory === "voltage" && (
              <OtherLast6DaysChart user={user} />
            )}
            {activeCategory === "voltage" && <OtherVoltlist user={user} />}
            {activeCategory === "steps" && <OtherStepsChart user={user} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherProfile;
