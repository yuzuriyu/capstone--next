import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";

export async function PATCH(request, { params }) {
  try {
    await connectToDb();

    const { completed } = await request.json();

    // Fetch session using getServerSession with authOptions
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Received badgeId:", params.badgeId); // Log badgeId

    // Find the badge within the user's badges
    const badge = user.badges.find((badge) => badge.badgeId === params.badgeId);

    if (!badge) {
      return NextResponse.json({ message: "Badge not found" }, { status: 404 });
    }

    // Update the completed status of the badge
    badge.completed = completed;
    await user.save();

    return NextResponse.json({ message: "Badge updated successfully" });
  } catch (err) {
    console.error("Error updating badge:", err);
    return NextResponse.json(
      { message: "Failed to update badge" },
      { status: 500 }
    );
  }
}
