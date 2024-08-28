import React from "react";
import { OtherVoltageContextProvider } from "@/context/OtherVoltageContext";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import Header from "@/components/Header";
import OtherProfile from "@/components/OtherProfile";

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

async function fetchUserVoltage(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/voltage/${email}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch user voltage data");
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

  if (!session) {
    return <div>No user session found</div>;
  }

  const { username } = params;
  console.log("Fetching data for username:", username);

  // Step 1: Fetch the user data using the username
  const userData = await fetchUserData(username);

  if (!userData || !userData.email) {
    return <div>User not found</div>;
  }

  const { email } = userData;
  console.log("Email extracted from user data:", email);

  // Step 2: Fetch the user voltage data using the extracted email
  const userVoltage = await fetchUserVoltage(email);

  if (!userVoltage) {
    return <div>Voltage data not found</div>;
  }

  console.log("User voltage data found:", userVoltage);

  return (
    <>
      <Header session={session} />
      <OtherVoltageContextProvider user={userVoltage}>
        <OtherProfile userData={userData} userVoltage={userVoltage} />
      </OtherVoltageContextProvider>
    </>
  );
};

export default Profile;
