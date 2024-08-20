import React from "react";
import OtherProfile from "@/components/OtherProfile";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import Header from "@/components/Header";
import { OtherVoltageContextProvider } from "@/context/OtherVoltageContext";

async function fetchUserData(username: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface ProfileProps {
  params: {
    username: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  const session = await getServerSession(authOptions);

  const { username } = params;
  console.log("Fetching data for username:", username);

  const user = await fetchUserData(username);

  if (!user) {
    return <div>User not found</div>;
  }
  console.log("User found:", user);
  return (
    <>
      <Header session={session} />
      <OtherVoltageContextProvider user={user}>
        <OtherProfile user={user} />
      </OtherVoltageContextProvider>
    </>
  );
};

export default Profile;
