import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { VoltageModel } from "@/models/Voltage";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    await connectToDb();

    const email = decodeURIComponent(params.email.trim());
    const {
      day,
      voltages,
    }: {
      day: string;
      voltages: Array<{ voltage: number; psi: number; timestamp?: Date }>;
    } = await request.json();

    console.log("Received parameters:", { email, day, voltages });

    if (!email) {
      console.error("Email parameter is missing in the request");
      return NextResponse.json(
        { message: "Email parameter is missing in the request" },
        { status: 400 }
      );
    }

    if (!voltages || !Array.isArray(voltages) || voltages.length === 0) {
      console.error("Invalid voltage data");
      return NextResponse.json(
        { message: "Invalid voltage data" },
        { status: 400 }
      );
    }

    // Validate that psi is provided for each voltage entry
    for (const voltage of voltages) {
      if (voltage.psi === undefined) {
        console.error("psi is required for all voltage entries");
        return NextResponse.json(
          { message: "psi is required for all voltage entries" },
          { status: 400 }
        );
      }
    }

    console.log(`Searching for user with email: ${email}`);
    const user = await VoltageModel.findOne({ email });

    if (!user) {
      console.error(`User with email ${email} not found`);
      return NextResponse.json(
        { message: `User with email ${email} not found` },
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
          voltage: v.voltage,
          timestamp: v.timestamp || new Date(),
          psi: v.psi, // psi is guaranteed to be present
        })),
      });
    } else {
      console.log(`Updating existing entry for day ${day}`);
      voltages.forEach((voltage) => {
        dayEntry.voltages.push({
          voltage: voltage.voltage,
          timestamp: voltage.timestamp || new Date(),
          psi: voltage.psi, // psi is guaranteed to be present
        });
      });
    }

    await user.save();

    console.log("Voltage data updated successfully");
    return NextResponse.json(
      { message: "Voltage data updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating voltage data:", err);
    return NextResponse.json(
      { message: "Failed to update data" },
      { status: 500 }
    );
  }
}
