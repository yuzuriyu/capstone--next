import { NextResponse } from "next/server";
import { InquiriesModel } from "@/models/Inquiries";
import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/utils";

export const POST = async (req: NextRequest) => {
  try {
    connectToDb();
    const newInquiry = await req.json();
    const inquiries = await InquiriesModel(newInquiry);
    await inquiries.save();
    return NextResponse.json(inquiries);
  } catch (err) {
    return NextResponse.json(`failed to post data${err}`, { status: 500 });
  }
};
