import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Adjusted import

export async function PATCH(request) {
  try {
    await connectToDb();

    const { coverPhoto } = await request.json();
    const session = await getServerSession({ req: request }); // Adjusted method

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.coverPhoto = coverPhoto;
    await user.save();

    return NextResponse.json({
      message: "Cover photo updated successfully",
    });
  } catch (err) {
    console.error("Error updating cover photo:", err);
    return NextResponse.json(
      { message: "Failed to update cover photo" },
      { status: 500 }
    );
  }
}
