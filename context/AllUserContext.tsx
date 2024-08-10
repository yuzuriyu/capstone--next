"use client";

import React, { ReactNode, createContext, useState, useEffect } from "react";
import { User } from "next-auth";

export interface AllUserContextType {
  allUsers: User[] | undefined;
  selectedUser: User | undefined;
  setSelectedUser: (user: User | undefined) => void;
}

interface Props {
  children: ReactNode;
}

const AllUserContext = createContext<AllUserContextType | undefined>(undefined);

const AllUserContextProvider: React.FC<Props> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[] | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAllUsers(data);
    };
    fetchUsers();
  }, []);

  const value: AllUserContextType = {
    allUsers,
    selectedUser,
    setSelectedUser,
  };

  return (
    <AllUserContext.Provider value={value}>{children}</AllUserContext.Provider>
  );
};

export default AllUserContextProvider;
export { AllUserContext, AllUserContextProvider };
