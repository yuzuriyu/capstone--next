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
    <div className="lg:py-20 w-11/12 lg:w-8/12 m-auto ">
      <div className="w-full py-4">
        <ul className="flex ">
          <li className="mr-7 text-sm">All</li>
          <li className="mr-7 text-sm">Completed</li>
          <li className="text-sm">Unachieved</li>
        </ul>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 grid-cols-2 md:grid-cols-3">
        {badges.map((badge: BadgeType) => (
          <div className="py-4 px-4 rounded-lg bg-white relative">
            <Image
              src={badge.badgeIcon}
              alt=""
              width={0}
              height={0}
              sizes="100vh"
              className="w-full rounded-lg"
            />
            <div className="py-1">
              <p className="font-bold">{badge.badgeName}</p>
              <p className="text-sm mb-4">{badge.requirement}</p>
              <p className="text-sm h-16">{badge.description}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="absolute bottom-4 right-4"
              fill="#4ABD4E"
            >
              <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achivement;
