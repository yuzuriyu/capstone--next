"use client";

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { BadgeType, BadgeContext } from "@/context/BadgeContext";
import { useSession } from "next-auth/react";

const PersonalInfo = () => {
  const badgeContext = useContext(BadgeContext);
  const { data: session, loading } = useSession();
  const [showAllBadge, setShowAllBadge] = useState(false);

  const [isEditBioOpen, setIsEditBioOpen] = useState(false);

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
  const filterBadge = badges.slice(0, 8);
  const badgeData = showAllBadge ? badges : filterBadge;

  const toggleBadge = () => {
    setShowAllBadge((prevStatus) => !prevStatus);
  };

  return (
    <div className="bg-bggray">
      <div className="relative h-[300px] w-full">
        <Image
          src={"/images/city.jpg"}
          alt=""
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute -bottom-20 md:left-12 left-4 flex items-center">
          <Image
            src={session?.user?.profilePicture}
            alt=""
            height={150}
            width={150}
            className="rounded-lg p-1 bg-white"
          />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 absolute lg:left-1/2 lg:-translate-x-1/2 bottom-2 right-4">
          <div className="">
            <p className="font-bold text-xl text-white">1</p>

            <p className="text-white text-sm">Total Voltage </p>
          </div>
          <div className="">
            <p className="font-bold text-xl text-white">1</p>

            <p className="text-white text-sm">Total Steps</p>
          </div>
        </div>
      </div>
      <div className="w-11/12 m-auto py-8 flex flex-col lg:flex-row gap-4">
        <div className="md:w-1/4 w-full mt-16">
          <p className="text-lg font-bold ">{session?.user?.username}</p>
          <p className="text-sm mb-4 text-gray-500">{session?.user?.title}</p>
          <div className="flex pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#A6ABC8"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
            </svg>
            <p className="ml-2 text-sm  text-gray-500">
              {session?.user?.location}
            </p>
          </div>
          <div className="flex pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#A6ABC8"
            >
              <path d="M16.997 15c-1.601 0-2.446-.676-3.125-1.219-.567-.453-.977-.781-1.878-.781-.898 0-1.287.311-1.874.78-.679.544-1.524 1.22-3.125 1.22s-2.444-.676-3.123-1.22C3.285 13.311 2.897 13 2 13v5c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-5c-.899 0-1.288.311-1.876.781-.68.543-1.525 1.219-3.127 1.219zM19 5h-6V2h-2v3H5C3.346 5 2 6.346 2 8v3c1.6 0 2.443.676 3.122 1.22.587.469.975.78 1.873.78.899 0 1.287-.311 1.875-.781.679-.543 1.524-1.219 3.124-1.219 1.602 0 2.447.676 3.127 1.219.588.47.977.781 1.876.781.9 0 1.311-.328 1.878-.781C19.554 11.676 20.399 11 22 11V8c0-1.654-1.346-3-3-3z"></path>
            </svg>
            <p className="ml-2 text-sm text-gray-500">
              {session?.user?.birthday}
            </p>
          </div>
          <div className="flex pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#A6ABC8"
            >
              <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
            </svg>
            <p className="ml-2 text-sm text-gray-500">
              {session?.user?.phoneNumber}
            </p>
          </div>
          <button className="rounded-full text-sm border border-customblue py-1 px-4 my-2 text-customblue">
            Edit Profile
          </button>
        </div>
        <div className="rounded-lg bg-white py-8 px-8 flex-1">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg ">Bio</p>
            {!isEditBioOpen && (
              <p
                className="text-customblue text-xs cursor-pointer"
                onClick={toggleBio}
              >
                Edit bio
              </p>
            )}
          </div>
          {!isEditBioOpen && (
            <p className="text-gray-500 py-4">{session?.user?.bio}</p>
          )}
          {isEditBioOpen && (
            <div className="my-4">
              <input
                placeholder="Write something about yourself"
                className="border border-customblue h-[75px] px-4 w-full rounded-lg"
              />
              <div className="flex justify-end my-4">
                <button
                  className="px-2 py-2 border text-sm bg-gray-200 rounded-lg  mr-2"
                  onClick={toggleBio}
                >
                  Cancel
                </button>
                <button className="px-2 py-2 border text-sm rounded-lg bg-gray-200 ">
                  Save
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-lg">Badges</p>
            <p
              className="text-customblue text-xs cursor-pointer "
              onClick={toggleBadge}
            >
              {showAllBadge ? "See less" : "Show more"}
            </p>
          </div>
          <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-4 grid-cols-3">
            {badgeData.map((badge: BadgeType) => (
              <div>
                <Image
                  src={badge.badgeIcon}
                  alt=""
                  height={75}
                  width={75}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
