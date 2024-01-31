import { Billboards } from "@/components/billboards";
import db from "@/lib/db";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Billboards billboards={billboards} />
      </div>
    </div>
  );
}
