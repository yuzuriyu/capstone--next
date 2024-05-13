import { VoltageModel } from "@/models/Voltage";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async () => {
  const voltageData = await VoltageModel.find({});
  revalidatePath(voltageData);
  return NextResponse.json(voltageData);
};
