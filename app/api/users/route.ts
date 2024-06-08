import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
export const GET = async () => {
  try {
    await connectToDb();
    const userData = await UserModel.find({});
    return NextResponse.json(userData, { status: 200 });
  } catch (err) {
    return NextResponse.json("failed to fetch data", { status: 500 });
  }
};

export const revalidate = 0;
