import db from "@/lib/db";
import { format } from "date-fns";
import { Sizes } from "@/components/sizes/sizes";
import { SizeColumn } from "@/components/sizes/sizes-table-columns";
import { Size } from "@prisma/client";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const sizes: Size[] = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Sizes sizes={formattedSizes} />
      </div>
    </div>
  );
}
