import OtherProfile from "@/components/OtherProfile";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import Header from "@/components/Header";

// Helper function to fetch user data
// async function getUserByUsername(username: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
//     { cache: "no-store" }
//   );
//   if (!res.ok) {
//     return null;
//   }
//   const user = await res.json();
//   return user;
// }

// async function getUserByUsername(username: string) {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`;
//   console.log("Fetching user from URL:", url); // Log the URL being fetched

//   const res = await fetch(url, { cache: "no-store" });
//   console.log("Fetch response status:", res.status); // Log the response status

//   if (!res.ok) {
//     console.error("Failed to fetch user:", res.status, res.statusText); // Log errors
//     return null;
//   }

//   const user = await res.json();
//   console.log("Fetched user data:", user); // Log the fetched user data
//   return user;
// }

async function getUserByUsername(username: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch user:", res.statusText);
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

  const user = await getUserByUsername(params.username);

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
