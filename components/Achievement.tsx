import React from "react";
import Image from "next/image";
import { BadgeType } from "@/app/interfaces";

const Achievement = ({ badges }) => {
  if (!badges) {
    return null;
  }
  return (
    <div className="w-11/12 m-auto md:w-8/12 lg:my-20">
      <div className="flex mb-4">
        <p className="text-sm mr-4">All</p>
        <p className="text-sm mr-4">Completed</p>
        <p className="text-sm">In progress</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {badges.map((badge: BadgeType) => (
          <div className="p-4 rounded-lg bg-white relative">
            <div className="h-[225px]">
              <Image
                src={badge.imgUrl}
                height={0}
                width={0}
                sizes="100vh"
                className=" object-cover h-full w-full"
                alt=""
              />
            </div>

            <div className="h-[100px]">
              <p className="font-bold mb-2">{badge.name}</p>
              <p className="text-sm">{badge.description}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#4ABD4E"
              className="absolute right-4 bottom-4"
            >
              <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
