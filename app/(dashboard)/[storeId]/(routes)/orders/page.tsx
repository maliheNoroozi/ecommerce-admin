import db from "@/lib/db";
import { format } from "date-fns";
import { Orders } from "@/components/orders/orders";
import { OrderColumn } from "@/components/orders/orders-table-columns";
import { currencyFormatter } from "@/lib/utils";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: currencyFormatter().format(
      item.orderItems.reduce(
        (total, orderItem) => (total + orderItem.product.price.toNumber(), 0),
        0
      )
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Orders orders={formattedOrders} />
      </div>
    </div>
  );
}
