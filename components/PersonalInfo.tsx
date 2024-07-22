"use client";

import React, { useContext, useState, useEffect } from "react";
import { BadgeType, BadgeContext } from "@/context/BadgeContext";
import { useSession } from "next-auth/react";
import EditProfile from "./EditProfile";
import Voltlist from "./Voltlist";
import Image from "next/image";
import Last6DaysChart from "./Last6DaysChart";
import StepsChart from "./StepsChart";
import { VoltageContext } from "@/context/VoltageContext";
import { ClipLoader } from "react-spinners";
import Loading from "@/app/loading";

const PersonalInfo = () => {
  const badgeContext = useContext(BadgeContext);
  const { data: session, status: sessionStatus } = useSession();
  const [showAllBadge, setShowAllBadge] = useState(false);

  const {
    totalAccumulatedVoltage,
    latestRecord,
    totalSteps,
    averageVoltage,
    peakVoltage,
    medianVoltage,
    standardDeviation,
    voltageRange,
    voltagePercentageChange,
  } = useContext(VoltageContext);

  const [activeCategory, setActiveCategory] = useState("voltage");

  const handleActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  const [isEditBioOpen, setIsEditBioOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const toggleEditProfile = () => {
    setIsEditProfileOpen((prevStatus) => !prevStatus);
  };

  const toggleBio = () => {
    setIsEditBioOpen((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (
      sessionStatus === "authenticated" &&
      session &&
      (!badgeContext || !badgeContext.badges)
    ) {
      // Fetch badges or handle initialization here
    }
  }, [sessionStatus, session, badgeContext]);

  if (
    sessionStatus === "loading" ||
    !session?.user?.coverPhoto ||
    !session?.user?.profilePicture ||
    !badgeContext?.badges
  ) {
    return <Loading />;
  }

  const { badges } = badgeContext;
  const filterBadge = badges.slice(0, 9);
  const badgeData = showAllBadge ? badges : filterBadge;

  const toggleBadge = () => {
    setShowAllBadge((prevStatus) => !prevStatus);
  };

  return (
    <>
      <div className="relative h-[330px] w-full">
        <Image
          src={session.user.coverPhoto}
          alt="Cover Photo"
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute w-11/12 lg:w-8/12 bottom-0 left-1/2 -translate-x-1/2 flex">
          <Image
            src={session.user.profilePicture}
            alt="Profile Picture"
            height={160}
            width={160}
            className="align-baseline"
          />
          <div className="flex relative">
            <p className="text-lg font-bold ml-6 absolute bottom-4 text-white w-[150px]">
              {session.user.username}
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
              <p className="text-sm">{session.user.bio}</p>
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

            <div className="bg-white py-4 px-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <p className="text-sm ">Badges</p>
                <p
                  className="text-sm text-customgreen cursor-pointer"
                  onClick={toggleBadge}
                >
                  {showAllBadge ? "See Less" : "Show All"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1 ">
                {badgeData?.map((badge) => (
                  <div key={badge.id}>
                    <Image
                      src={badge.badgeIcon}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vh"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:flex-1 flex flex-col">
            {activeCategory === "voltage" && <Last6DaysChart />}
            {activeCategory === "voltage" && <Voltlist />}
            {activeCategory === "steps" && <StepsChart />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
