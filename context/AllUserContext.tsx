"use client";

import React, { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import { User } from "next-auth";

export interface AllUserContextType {
  allUsers: User[] | undefined;
  selectedUser: any;
  setSelectedUser: () => void;
}

interface Props {
  children: ReactNode;
}
const AllUserContext = createContext<AllUserContextType | undefined>(undefined);

const AllUserContextProvider: React.FC<Props> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User | undefined>();

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      await fetch("api/users")
        .then((res) => res.json())
        .then((data) => setAllUsers(data));
    };
    fetchUsers();
  }, []);

  const value: AllUserContextType = {
    allUsers,
    selectedUser,
    setSelectedUser,
  };

  console.log(selectedUser);
  return (
    <AllUserContext.Provider value={value}>{children}</AllUserContext.Provider>
  );
};

export default AllUserContextProvider;

export { AllUserContext, AllUserContextProvider };
