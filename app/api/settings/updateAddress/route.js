import { UserModel } from "@/models/User";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Adjusted import

export async function PATCH(request) {
  try {
    await connectToDb();

    const { address } = await request.json();
    const session = await getServerSession({ req: request }); // Adjusted method

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!address || typeof address !== "string" || address.trim() === "") {
      return NextResponse.json(
        { message: "Invalid address provided" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.address = address.trim(); // Ensure address is sanitized
    await user.save();

    return NextResponse.json({ message: "Address updated successfully" });
  } catch (err) {
    console.error("Error updating address:", err);
    return NextResponse.json(
      { message: "Failed to update address" },
      { status: 500 }
    );
  }
}
