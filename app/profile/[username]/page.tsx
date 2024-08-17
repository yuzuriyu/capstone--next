import OtherProfile from "@/components/OtherProfile";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import Header from "@/components/Header";

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

  const user = await fetchUserData(username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Header session={session} />
      <OtherProfile user={user} />
    </>
  );
};

export default Profile;
