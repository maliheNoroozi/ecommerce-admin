import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await db.store.create({
      data: { name, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
