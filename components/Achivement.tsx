"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { BadgeContext, BadgeType } from "@/context/BadgeContext";

const Achivement = () => {
  const badgeContext = useContext(BadgeContext);

  if (!badgeContext || !badgeContext.badges) {
    return <div>Loading...</div>;
  }

  const { badges } = badgeContext;

  return (
    <div className="py-4">
      <div className="w-11/12 m-auto flex justify-between flex-col md:flex-row items-center py-4">
        <ul className="flex ">
          <li className="mr-7">All</li>
          <li className="mr-7">Completed</li>
          <li className="mr-7">Inprogress</li>
          <li>Unachieved</li>
        </ul>
        <p className="mt-4 md:mt-0">
          Total: <span className="font-bold text-lg">500</span>
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {badges.map((badge: BadgeType) => (
          <div className="flex w-11/12 m-auto border-b py-4 px-4 items-center rounded-lg justify-between">
            <div className="flex w-1/2">
              <Image
                src={badge.badgeIcon}
                alt=""
                width={0}
                height={0}
                sizes="100vh"
                className="rounded-full mr-4 w-16 h-16"
              />
              <div className="flex-1">
                <p className="font-bold">{badge.badgeName}</p>
                <p className="text-sm">{badge.requirement}</p>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="green"
            >
              <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
            </svg>
            <p className="font-bold text-xl ml-8">+{badge.exp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achivement;
