import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { VoltageModel } from "@/models/Voltage";

export const GET = async (
  request: Request,
  { params }: { params: { email: string } }
) => {
  const email = params.email;
  try {
    await connectToDb();
    const readings = await VoltageModel.findOne({ email });

    if (!readings) {
      return NextResponse.json("failed to fetch data", { status: 500 });
    }

    return NextResponse.json(readings, { status: 200 });
  } catch (err) {
    return NextResponse.json("failed to fetch user", { status: 500 });
  }
};

export const revalidate = 60;
