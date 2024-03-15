"use server";

import db from "@/lib/db";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await db.order.count({
    where: { storeId, isPaid: true },
  });

  return salesCount;
};
