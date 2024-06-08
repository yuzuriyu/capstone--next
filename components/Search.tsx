"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import AllUserContextProvider, {
  AllUserContext,
} from "@/context/AllUserContext";

interface Props {
  toggleSearch: () => void;
}

const Search: React.FC<Props> = ({ toggleSearch }) => {
  const { allUsers, setSelectedUser } = useContext(AllUserContext);
  const { data: session } = useSession();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      const results = allUsers.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers(allUsers); // Reset to all users if search query is empty
    }
  }, [searchQuery, allUsers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!session) {
    return null;
  }

  if (!filteredUsers) {
    return null;
  }
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white w-full z-50 shadow-lg rounded-lg py-4 px-4">
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="mr-4 cursor-pointer hover:fill-customblue"
          fill="#A6ABC8"
          onClick={toggleSearch}
        >
          <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
        </svg>
        <div className="w-full md:flex rounded-full px-4 border items-center hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="#A6ABC8"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
          <input
            placeholder="Search"
            className="rounded-full flex-1 py-2 hidden md:block focus:outline-none"
            onChange={handleInputChange}
          />
        </div>
      </div>
      {filteredUsers.map((user) => (
        <div
          className="flex items-center justify-between my-2"
          onClick={() => {
            setSelectedUser(user);
            router.push(`/profile/${user.username}`);
            toggleSearch(); // Close the search dropdown
          }}
        >
          <div className="flex items-center">
            <Image
              src={user?.profilePicture}
              alt=""
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <p>{user?.username}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#A6ABC8"
            className="hover:fill-customblue cursor-pointer"
          >
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Search;
