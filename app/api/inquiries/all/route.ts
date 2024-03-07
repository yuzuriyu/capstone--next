import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { InquiriesModel } from "@/models/Inquiries";

export const GET = async () => {
  try {
    await connectToDb();
    const inquiries = await InquiriesModel.find({});
    return NextResponse.json(inquiries, { status: 200 });
  } catch (err) {
    return NextResponse.json("failed to fetch data", { status: 500 });
  }
};
