"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns, ColorColumn } from "@/components/colors/colors-table-columns";
import { ApiList } from "@/components/ui/api-list";

interface ColorsProps {
  colors: ColorColumn[];
}

export const Colors: FC<ColorsProps> = ({ colors }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors(${colors.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <PlusIcon size={20} className="mr-2" />
          New Color
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={colors} searchKey="name" />
      <Heading title="API" description="API calls for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};
