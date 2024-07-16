import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Adjusted import

export async function PATCH(request: Request) {
  try {
    await connectToDb();

    const { email } = await request.json();
    const session = await getServerSession({ req: request }); // Adjusted method

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser && existingUser._id.toString() !== session.user.id) {
      return NextResponse.json(
        { message: "Email already in use by another account" },
        { status: 409 }
      );
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.email = email;
    await user.save();

    return NextResponse.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error("Error updating email:", err);
    return NextResponse.json(
      { message: "Failed to update email" },
      { status: 500 }
    );
  }
}
