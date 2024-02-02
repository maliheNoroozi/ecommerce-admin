"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  columns,
  ProductColumn,
} from "@/components/products/products-table-columns";
import { ApiList } from "@/components/ui/api-list";

interface ProductsProps {
  products: ProductColumn[];
}

export const Products: FC<ProductsProps> = ({ products }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products(${products.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <PlusIcon size={20} className="mr-2" />
          New Product
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} searchKey="name" />
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
