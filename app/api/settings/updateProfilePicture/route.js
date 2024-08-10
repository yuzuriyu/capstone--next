import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Adjusted import

export async function PATCH(request) {
  try {
    await connectToDb();

    const { profilePicture } = await request.json();
    const session = await getServerSession({ req: request }); // Adjusted method

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.profilePicture = profilePicture;
    await user.save();

    return NextResponse.json({
      message: "Profile picture updated successfully",
    });
  } catch (err) {
    console.error("Error updating profile picture:", err);
    return NextResponse.json(
      { message: "Failed to update profile picture" },
      { status: 500 }
    );
  }
}
