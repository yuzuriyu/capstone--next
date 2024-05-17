import { VoltageModel } from "@/models/Voltage";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async () => {
  const voltageData = await VoltageModel.find({});
  revalidateTag("voltage");
  return NextResponse.json({ voltageData, revalidated: true, now: Date.now() });
};
