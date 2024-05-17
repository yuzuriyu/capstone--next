import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { VoltageModel } from "@/models/Voltage";
export const GET = async () => {
  try {
    await connectToDb();
    const voltageData = await VoltageModel.find({});
    return NextResponse.json(voltageData, { status: 200 });
  } catch (err) {
    return NextResponse.json("failed to fetch data", { status: 500 });
  }
};
