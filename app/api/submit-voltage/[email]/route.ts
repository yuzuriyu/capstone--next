import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    await connectToDb();

    // Ensure email is properly decoded
    const email = decodeURIComponent(params.email.trim());
    const {
      day,
      voltages,
    }: { day: string; voltages: Array<{ voltage: number; timestamp?: Date }> } =
      await request.json();

    console.log("Received parameters:", { email, day, voltages });

    if (!email) {
      console.error("Email parameter is missing in the request");
      return NextResponse.json(
        {
          message: "Email parameter is missing in the request",
        },
        { status: 400 }
      );
    }

    if (!voltages || !Array.isArray(voltages) || voltages.length === 0) {
      console.error("Invalid voltage data");
      return NextResponse.json(
        {
          message: "Invalid voltage data",
        },
        { status: 400 }
      );
    }

    // Log before database query
    console.log(`Searching for user with email: ${email}`);
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.error(`User with email ${email} not found`);
      return NextResponse.json(
        {
          message: `User with email ${email} not found`,
        },
        { status: 404 }
      );
    }

    console.log("User found:", user);

    const dayEntry = user.voltages.find((v: { day: string }) => v.day === day);

    if (!dayEntry) {
      console.log(`Day ${day} not found, creating new entry`);
      user.voltages.push({
        day,
        voltages: voltages.map((v) => ({
          voltage: v.voltage || 0, // Default to 0 if voltage is missing
          timestamp: v.timestamp || new Date(),
        })),
      });
    } else {
      console.log(`Updating existing entry for day ${day}`);
      voltages.forEach((voltage) => {
        dayEntry.voltages.push({
          voltage: voltage.voltage || 0, // Default to 0 if voltage is missing
          timestamp: voltage.timestamp || new Date(),
        });
      });
    }

    await user.save();

    console.log("Voltage data updated successfully");
    return NextResponse.json(
      {
        message: "Voltage data updated successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating voltage data:", err);
    return NextResponse.json(
      {
        message: "Failed to update data",
      },
      { status: 500 }
    );
  }
}
