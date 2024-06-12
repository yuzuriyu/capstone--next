"use client";

import React, { useContext, useState, useEffect } from "react";
import { BadgeType, BadgeContext } from "@/context/BadgeContext";
import { useSession } from "next-auth/react";
import EditProfile from "./EditProfile";
import Voltlist from "./Voltlist";
import Image from "next/image";
import Last6DaysChart from "./Last6DaysChart";
import StepsChart from "./StepsChart";
const PersonalInfo = () => {
  const badgeContext = useContext(BadgeContext);
  const { data: session, loading } = useSession();
  const [showAllBadge, setShowAllBadge] = useState(false);

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
    if (!loading && (!badgeContext || !badgeContext.badges)) {
      // Fetch badges or handle initialization here
    }
  }, [loading, badgeContext]);

  if (loading) {
    return null;
  }

  if (!badgeContext || !badgeContext.badges) {
    return <div>Loading...</div>;
  }

  const { badges } = badgeContext;
  const filterBadge = badges.slice(0, 9);
  const badgeData = showAllBadge ? badges : filterBadge;

  const toggleBadge = () => {
    setShowAllBadge((prevStatus) => !prevStatus);
  };
  console.log(badges);
  if (!badges) {
    return null;
  }
  return (
    <>
      <div className="relative h-[330px] w-full">
        <Image
          src={"/images/city.jpg"}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute w-11/12 lg:w-8/12 bottom-0 left-1/2 -translate-x-1/2 flex">
          <Image
            src={session?.user?.profilePicture}
            alt=""
            height={160}
            width={160}
            className="align-baseline"
          />
          <div className="flex relative">
            <p className="text-lg font-bold ml-6 absolute bottom-4 text-white w-[150px]">
              {session?.user?.username}
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
              <p className="text-sm">{session?.user?.bio}</p>
            </div>
            <div className="bg-white rounded-lg py-4 px-4 grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-customgreen text-center mb-2">349</p>
                <p className="text-xs text-center">Total Voltage</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">172</p>
                <p className="text-xs text-center">Total Steps</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">90%</p>
                <p className="text-xs text-center">Percentage</p>
              </div>
            </div>

            <div className="bg-white rounded-lg py-4 px-4 grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-customgreen text-center mb-2">349</p>
                <p className="text-xs text-center">Total Voltage</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">172</p>
                <p className="text-xs text-center">Total Steps</p>
              </div>
              <div>
                <p className="text-customgreen text-center mb-2">90%</p>
                <p className="text-xs text-center">Percentage</p>
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
                  <div className="">
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
