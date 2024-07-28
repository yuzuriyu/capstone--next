import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/utils";
import { UserModel } from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { username: string } }
) => {
  const username = params.username;
  try {
    await connectToDb();
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json("failed to fetch data", { status: 500 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json("failed to fetch user", { status: 500 });
  }
};
