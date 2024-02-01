import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface RequestProps {
  params: {
    storeId: string;
  };
}

export const PATCH = async (req: NextRequest, { params }: RequestProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.update({
      where: { id: params.storeId, userId },
      data: { name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE-PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: RequestProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.delete({
      where: { id: params.storeId, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE-DELET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
