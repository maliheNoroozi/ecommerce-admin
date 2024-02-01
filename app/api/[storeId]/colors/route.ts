import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface RequestProps {
  params: {
    storeId: string;
  };
}

export const GET = async (req: NextRequest, { params }: RequestProps) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const colors = await db.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS-GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest, { params }: RequestProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const { name, value } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const color = await db.color.create({
      data: {
        storeId: params.storeId,
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
