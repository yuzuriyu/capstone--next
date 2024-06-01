import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDb();
    const { email, username, password } = await req.json();

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Email, username, and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    await UserModel.create({ email, username, password });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error registering user:", err);
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
