import { NextApiRequest, NextApiResponse } from "next";
import { VoltageModel } from "@/models/Voltage";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { day: string } }
) {
  try {
    await connectToDb();

    const day = params.day;
    const { voltages } = await request.json();

    const timestamp = new Date();

    if (!day) {
      return NextResponse.json({
        message: "Day parameter is missing in the request",
      });
    }

    if (!voltages || !Array.isArray(voltages) || voltages.length === 0) {
      return NextResponse.json({
        message: "Invalid voltage data ",
      });
    }

    const existingVoltage = await VoltageModel.findOne({ day });

    if (!existingVoltage) {
      return NextResponse.json({
        message: `voltage data for ${day} not found`,
      });
    }

    voltages.forEach((voltage: any) => {
      if (!voltage.timestamp) {
        voltage.timestamp = timestamp;
      }
    });

    existingVoltage.voltages.push(...voltages);
    await existingVoltage.save();

    console.log("Voltage data updated successfully");
    return NextResponse.json({
      message: "voltage data updated successfully",
    });
  } catch (err) {
    console.error("Error updating voltage data:", err);

    return NextResponse.json({
      message: "failed to update data",
    });
  }
}
