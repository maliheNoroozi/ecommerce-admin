"use server";

import db from "@/lib/db";

export interface GraphData {
  name:
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";
  total: number;
}

export const getTotalRevenue = async (storeId: string) => {
  const orders = await db.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = orders.reduce((total, order) => {
    const orderItemsTotal = order.orderItems.reduce((total, orderItem) => {
      return total + Number(orderItem.product.price);
    }, 0);

    return total + orderItemsTotal;
  }, 0);

  return totalRevenue;
};

export const getGraphRevenue = async (storeId: string) => {
  const orders = await db.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: Record<number, number> = {};
  for (let order of orders) {
    const month = order.createdAt.getMonth();
    const orderRevenue = order.orderItems.reduce(
      (total, orderItem) => total + Number(orderItem.product.price),
      0
    );
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + orderRevenue;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
