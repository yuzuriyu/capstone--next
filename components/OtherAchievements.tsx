import React, { useState } from "react";
import Image from "next/image";
import { BadgeType, User } from "@/app/interfaces";

interface OtherAchievementsProps {
  userData: User;
  badges: BadgeType[];
  toggleAchievements: () => void;
}

const OtherAchievements: React.FC<OtherAchievementsProps> = ({
  userData,
  badges,
  toggleAchievements,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  if (!userData) {
    return null;
  }

  // Function to filter badges based on active category
  const filteredBadges = badges.filter((badge: BadgeType) => {
    if (activeCategory === "all") return true; // Show all badges
    if (activeCategory === "completed") return badge.completed; // Show only completed badges
    if (activeCategory === "in progress") return !badge.completed; // Show in-progress badges
    return false;
  });

  return (
    <div className="fixed inset-0 z-40 ">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={toggleAchievements}
      ></div>

      <div className="absolute z-50 w-11/12 md:w-8/12  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-customgray rounded-lg p-4">
        <div className="flex mb-4 justify-between">
          <div className="flex">
            <p
              className={`text-sm mr-4 cursor-pointer ${
                activeCategory === "all" ? "text-customgreen" : ""
              }`}
              onClick={() => toggleActiveCategory("all")}
            >
              All
            </p>
            <p
              className={`text-sm mr-4 cursor-pointer ${
                activeCategory === "completed" ? "text-customgreen" : ""
              }`}
              onClick={() => toggleActiveCategory("completed")}
            >
              Completed
            </p>
            <p
              className={`text-sm cursor-pointer ${
                activeCategory === "in progress" ? "text-customgreen" : ""
              }`}
              onClick={() => toggleActiveCategory("in progress")}
            >
              In progress
            </p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="cursor-pointer hover:fill-customgreen"
            onClick={toggleAchievements}
          >
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 h-[500px] overflow-auto">
          {filteredBadges.map((badge: BadgeType) => (
            <div
              key={badge.badgeId}
              className="p-4 rounded-lg bg-white relative h-[350px]"
            >
              <div className="h-[225px]">
                <Image
                  src={badge.imgUrl}
                  height={0}
                  width={0}
                  sizes="100vh"
                  className="object-contain h-full w-full"
                  alt={badge.name}
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
                fill={`${badge.completed ? "#4ABD4E" : "#A6ABC8"}`}
                className="absolute right-4 bottom-4"
              >
                <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherAchievements;
