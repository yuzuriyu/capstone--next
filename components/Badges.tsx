import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { VoltageContext } from "@/context/VoltageContext";
import { BadgeType } from "@/app/interfaces";
import { Session } from "@/app/interfaces";
import Achievements from "./Achievements";

interface BadgesProps {
  session: Session;
}
const Badges: React.FC<BadgesProps> = ({ session }) => {
  const { totalAccumulatedVoltage, totalSteps } = useContext(VoltageContext);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [badges, setBadges] = useState<BadgeType[]>(
    session?.user?.badges || []
  );

  const toggleAchievements = () => {
    setIsAchievementsOpen((prevStatus) => !prevStatus);
  };

  const updateBadgeCompletion = async (badgeId: string, completed: boolean) => {
    console.log(`Attempting to update badge ${badgeId} to ${completed}`);
    try {
      const response = await fetch(`/api/badges/${badgeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        console.error(
          `Error updating badge ${badgeId}:`,
          await response.text()
        );
      } else {
        console.log(`Badge ${badgeId} successfully updated to ${completed}`);
      }
    } catch (error) {
      console.error(`Error updating badge ${badgeId}:`, error);
    }
  };

  const updateBadges = () => {
    console.log("Updating badges based on current context values");
    badges.forEach(async (badge) => {
      let isCompleted = false;
      switch (badge.badgeId) {
        case "voltage_crusader":
          isCompleted = totalAccumulatedVoltage >= 5000;
          break;
        case "energy_emission":
          isCompleted = totalAccumulatedVoltage >= 2500;
          break;
        case "kinetic_keeper":
          isCompleted = totalSteps >= 10000;
          break;
        case "power_pioneer":
          isCompleted = totalSteps >= 50000;
          break;
        case "step_master":
          isCompleted = totalSteps >= 25000;
          break;
        case "step_shifter":
          isCompleted = totalSteps >= 5000;
          break;
        case "trailblazer":
          isCompleted = totalSteps >= 0;
          break;
        case "voltage_voyager":
          isCompleted = totalAccumulatedVoltage >= 100;
          break;

        default:
          console.error(`Badge criteria not defined for ${badge.badgeId}`);
          break;
      }

      console.log(`Badge ${badge.badgeId} status: ${isCompleted}`);
      if (badge.completed !== isCompleted) {
        console.log(
          `Badge ${badge.badgeId} needs update. Current: ${badge.completed}, New: ${isCompleted}`
        );
        await updateBadgeCompletion(badge.badgeId, isCompleted);
        setBadges((prevBadges) =>
          prevBadges.map((b) =>
            b.badgeId === badge.badgeId ? { ...b, completed: isCompleted } : b
          )
        );
      }
    });
  };

  useEffect(() => {
    console.log("Component mounted or context values changed");
    if (totalAccumulatedVoltage || totalSteps) {
      updateBadges(); // Update badges based on context values
    }
  }, [totalAccumulatedVoltage, totalSteps]); // Dependencies for the effect

  if (!session) {
    return <ClipLoader />;
  }

  // Filter badges to only include completed ones
  const completedBadges = badges.filter((badge) => badge.completed);

  return (
    <div className="">
      <div className="mb-2 bg-white flex justify-between items-center px-4 py-2">
        <p className="rounded-lg text-sm">Badges</p>
        <p
          className="text-customgreen text-xs cursor-pointer"
          onClick={toggleAchievements}
        >
          See more
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-customgray">
        {completedBadges.map((badge: BadgeType) => (
          <div key={badge.badgeId} className="bg-white">
            <Image
              src={badge.imgUrl}
              alt={badge.name}
              width={0}
              height={0}
              sizes="100vh"
              className="m-auto object-contain h-full w-full"
            />
          </div>
        ))}
      </div>
      {isAchievementsOpen && (
        <Achievements
          session={session}
          badges={badges}
          toggleAchievements={toggleAchievements}
        />
      )}
    </div>
  );
};

export default Badges;
