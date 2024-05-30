"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface BadgeContextType {
  badges: BadgeType[] | undefined;
}

export interface BadgeType {
  badgeId: number;
  badgeName: string;
  badgeIcon: string;
  requirement: string;
  description: string;
  completed: boolean;
  exp: number;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

const BadgeContextProvider: React.FC<Props> = ({ children }) => {
  const [badges, setBadges] = useState<BadgeType[] | undefined>();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/badges");
        const data = await res.json();
        setBadges(data); // Assuming data is an array of BadgeType
      } catch (err) {
        console.log(err);
      }
    };
    fetchBadges();
  }, []);

  const value: BadgeContextType = {
    badges,
  };

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
};

export default BadgeContextProvider;
export { BadgeContext, BadgeContextProvider };
