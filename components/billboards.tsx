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
  BillboardColumn,
} from "@/components/billboards-table-columns";
import { ApiList } from "@/components/ui/api-list";

interface BillboardsProps {
  billboards: BillboardColumn[];
}

export const Billboards: FC<BillboardsProps> = ({ billboards }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards(${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon size={20} className="mr-2" />
          New Billboard
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={billboards} searchKey="label" />
      <Heading title="API" description="API calls for billboard" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
