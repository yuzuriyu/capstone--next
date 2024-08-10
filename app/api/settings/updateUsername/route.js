import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Adjusted import

export async function PATCH(request) {
  try {
    await connectToDb();

    const { username } = await request.json();
    const session = await getServerSession({ req: request }); // Adjusted method

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser && existingUser._id.toString() !== session.user.id) {
      return NextResponse.json(
        { message: "Username already in use by another account" },
        { status: 409 }
      );
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.username = username;
    await user.save();

    return NextResponse.json({ message: "Username updated successfully" });
  } catch (err) {
    console.error("Error updating username:", err);
    return NextResponse.json(
      { message: "Failed to update username" },
      { status: 500 }
    );
  }
}
