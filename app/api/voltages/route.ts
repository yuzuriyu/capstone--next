import { VoltageModel } from "@/models/Voltage";
import { NextResponse } from "next/server";

export const revalidate = 1; //revalidate api every 1 second

export const GET = async () => {
  const voltageData = await VoltageModel.find({});
  return NextResponse.json(voltageData);
};
