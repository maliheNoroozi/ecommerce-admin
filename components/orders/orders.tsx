import { FC } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns, OrderColumn } from "@/components/orders/orders-table-columns";

interface OrdersProps {
  orders: OrderColumn[];
}

export const Orders: FC<OrdersProps> = ({ orders }) => {
  return (
    <>
      <Heading
        title={`Orders(${orders.length})`}
        description="Orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="products" />
    </>
  );
};
