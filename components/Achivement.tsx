import React from "react";
import Image from "next/image";
const Achivement = () => {
  const badges = [
    {
      badgeId: 1,
      badgeName: "First Badge",
      badgeIcon: "/images/prosdsfile.jpg",
      requirement: "Sign up",
      description: "Welcome to Spark Step!",
      completed: false,
      exp: 100,
    },
    {
      badgeId: 2,
      badgeName: "Level 5 Achiever",
      badgeIcon: "/images/level5.jpg",
      requirement: "Reach level 5",
      description: "Congratulations on reaching level 5!",
      completed: false,
      exp: 500,
    },
    {
      badgeId: 3,
      badgeName: "Level 10 Champion",
      badgeIcon: "/images/level10.jpg",
      requirement: "Reach level 10",
      description: "Congratulations on reaching level 10!",
      completed: false,
      exp: 1000,
    },
    {
      badgeId: 4,
      badgeName: "Voltage Beginner",
      badgeIcon: "/images/voltage50.jpg",
      requirement: "Generate 50 volts",
      description: "Great start! You've generated 50 volts.",
      completed: false,
      exp: 200,
    },
    {
      badgeId: 5,
      badgeName: "Voltage Expert",
      badgeIcon: "/images/voltage500.jpg",
      requirement: "Generate 500 volts",
      description: "Amazing! You've generated 500 volts.",
      completed: false,
      exp: 1000,
    },
    {
      badgeId: 6,
      badgeName: "Step Beginner",
      badgeIcon: "/images/steps500.jpg",
      requirement: "Take 500 steps",
      description: "Keep going! You've taken 500 steps.",
      completed: false,
      exp: 300,
    },
    {
      badgeId: 7,
      badgeName: "Step Master",
      badgeIcon: "/images/steps5000.jpg",
      requirement: "Take 5000 steps",
      description: "Incredible! You've taken 5000 steps.",
      completed: false,
      exp: 1500,
    },
    {
      badgeId: 8,
      badgeName: "Voltage Warrior",
      badgeIcon: "/images/voltage2500.jpg",
      requirement: "Generate 2500 volts",
      description: "You're unstoppable! 2500 volts generated.",
      completed: false,
      exp: 2500,
    },
    {
      badgeId: 9,
      badgeName: "Step Champion",
      badgeIcon: "/images/steps2500.jpg",
      requirement: "Take 2500 steps",
      description: "Great job! You've taken 2500 steps.",
      completed: false,
      exp: 800,
    },
    {
      badgeId: 10,
      badgeName: "Voltage Apprentice",
      badgeIcon: "/images/voltage200.jpg",
      requirement: "Generate 200 volts",
      description: "Good job! You've generated 200 volts.",
      completed: false,
      exp: 600,
    },
    {
      badgeId: 11,
      badgeName: "Step Enthusiast",
      badgeIcon: "/images/steps1000.jpg",
      requirement: "Take 1000 steps",
      description: "Keep it up! You've taken 1000 steps.",
      completed: false,
      exp: 400,
    },
    {
      badgeId: 12,
      badgeName: "Voltage Conqueror",
      badgeIcon: "/images/voltage5000.jpg",
      requirement: "Generate 5000 volts",
      description: "Amazing! You've generated 5000 volts.",
      completed: false,
      exp: 5000,
    },
    {
      badgeId: 13,
      badgeName: "Step Explorer",
      badgeIcon: "/images/steps7500.jpg",
      requirement: "Take 7500 steps",
      description: "Fantastic! You've taken 7500 steps.",
      completed: false,
      exp: 2000,
    },
    {
      badgeId: 14,
      badgeName: "Voltage Master",
      badgeIcon: "/images/voltage10000.jpg",
      requirement: "Generate 10000 volts",
      description: "You're a master! 10000 volts generated.",
      completed: false,
      exp: 10000,
    },
    {
      badgeId: 15,
      badgeName: "Step Legend",
      badgeIcon: "/images/steps10000.jpg",
      requirement: "Take 10000 steps",
      description: "Legendary! You've taken 10000 steps.",
      completed: false,
      exp: 3000,
    },
    {
      badgeId: 16,
      badgeName: "Voltage Hero",
      badgeIcon: "/images/voltage7500.jpg",
      requirement: "Generate 7500 volts",
      description: "You're a hero! 7500 volts generated.",
      completed: false,
      exp: 7500,
    },
    {
      badgeId: 17,
      badgeName: "Step Voyager",
      badgeIcon: "/images/steps15000.jpg",
      requirement: "Take 15000 steps",
      description: "Voyager! You've taken 15000 steps.",
      completed: false,
      exp: 4000,
    },
    {
      badgeId: 18,
      badgeName: "Voltage Supreme",
      badgeIcon: "/images/voltage15000.jpg",
      requirement: "Generate 15000 volts",
      description: "Supreme! 15000 volts generated.",
      completed: false,
      exp: 12500,
    },
    {
      badgeId: 19,
      badgeName: "Step Wanderer",
      badgeIcon: "/images/steps20000.jpg",
      requirement: "Take 20000 steps",
      description: "Wanderer! You've taken 20000 steps.",
      completed: false,
      exp: 5000,
    },
    {
      badgeId: 20,
      badgeName: "Voltage Overlord",
      badgeIcon: "/images/voltage20000.jpg",
      requirement: "Generate 20000 volts",
      description: "Overlord! 20000 volts generated.",
      completed: false,
      exp: 15000,
    },
    {
      badgeId: 21,
      badgeName: "Step Pioneer",
      badgeIcon: "/images/steps25000.jpg",
      requirement: "Take 25000 steps",
      description: "Pioneer! You've taken 25000 steps.",
      completed: false,
      exp: 6000,
    },
    {
      badgeId: 22,
      badgeName: "Voltage Titan",
      badgeIcon: "/images/voltage25000.jpg",
      requirement: "Generate 25000 volts",
      description: "Titan! 25000 volts generated.",
      completed: false,
      exp: 17500,
    },
    {
      badgeId: 23,
      badgeName: "Step Trailblazer",
      badgeIcon: "/images/steps30000.jpg",
      requirement: "Take 30000 steps",
      description: "Trailblazer! You've taken 30000 steps.",
      completed: false,
      exp: 7000,
    },
    {
      badgeId: 24,
      badgeName: "Voltage Emperor",
      badgeIcon: "/images/voltage30000.jpg",
      requirement: "Generate 30000 volts",
      description: "Emperor! 30000 volts generated.",
      completed: false,
      exp: 20000,
    },
    {
      badgeId: 25,
      badgeName: "Step Conqueror",
      badgeIcon: "/images/steps35000.jpg",
      requirement: "Take 35000 steps",
      description: "Conqueror! You've taken 35000 steps.",
      completed: false,
      exp: 8000,
    },
    {
      badgeId: 26,
      badgeName: "Voltage King",
      badgeIcon: "/images/voltage35000.jpg",
      requirement: "Generate 35000 volts",
      description: "King! 35000 volts generated.",
      completed: false,
      exp: 22500,
    },
    {
      badgeId: 27,
      badgeName: "Step Monarch",
      badgeIcon: "/images/steps40000.jpg",
      requirement: "Take 40000 steps",
      description: "Monarch! You've taken 40000 steps.",
      completed: false,
      exp: 9000,
    },
  ];

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
        {badges.map((badge) => (
          <div className="flex w-11/12 m-auto border-b py-4 px-4 items-center rounded-lg justify-between">
            <div className="flex w-1/2">
              <Image
                src={badge.badgeIcon}
                alt=""
                width={40}
                height={40}
                className="rounded-full mr-4"
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
