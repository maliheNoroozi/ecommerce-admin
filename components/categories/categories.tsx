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
  CategoryColumn,
} from "@/components/categories/categories-table-columns";
import { ApiList } from "@/components/ui/api-list";

interface CategoriesProps {
  categories: CategoryColumn[];
}

export const Categories: FC<CategoriesProps> = ({ categories }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${categories.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon size={20} className="mr-2" />
          New Category
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Heading title="API" description="API calls for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
