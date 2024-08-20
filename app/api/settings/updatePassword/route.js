import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";

export async function PATCH(request) {
  try {
    await connectToDb();

    // Get session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmPassword } =
      await request.json();

    // Fetch the user using the email from the session
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isPasswordCorrect = currentPassword === user.password;
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect current password" },
        { status: 400 }
      );
    }

    // Validate new password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "New password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 500 }
    );
  }
}
