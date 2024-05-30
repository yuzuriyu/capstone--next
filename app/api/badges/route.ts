import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { BadgeModel } from "@/models/Badges";

export const GET = async () => {
  try {
    await connectToDb();
    const badges = await BadgeModel.find({});
    return NextResponse.json(badges, { status: 200 });
  } catch (err) {
    return NextResponse.json("failed to fetch data", { status: 500 });
  }
};

export const revalidate = 0;
