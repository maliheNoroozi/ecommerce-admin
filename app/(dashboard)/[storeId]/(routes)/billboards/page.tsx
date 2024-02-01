import db from "@/lib/db";
import { format } from "date-fns";
import { Billboards } from "@/components/billboards/billboards";
import { BillboardColumn } from "@/components/billboards/billboards-table-columns";
import { Billboard } from "@prisma/client";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const billboards: Billboard[] = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Billboards billboards={formattedBillboards} />
      </div>
    </div>
  );
}
