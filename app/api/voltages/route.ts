import { VoltageModel } from "@/models/Voltage";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async () => {
  const voltageData = await VoltageModel.find({});
  return NextResponse.json(voltageData);
};
