import OtherProfile from "@/components/OtherProfile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/Header";

// Helper function to fetch user data
async function getUserByUsername(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return null;
  }
  const user = await res.json();
  return user;
}

interface ProfileProps {
  params: {
    username: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  const session = await getServerSession(authOptions);

  // Fetch user data based on the username from the URL params
  const user = await getUserByUsername(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Header session={session} />
      <OtherProfile user={user} session={session} />
    </>
  );
};

export default Profile;
