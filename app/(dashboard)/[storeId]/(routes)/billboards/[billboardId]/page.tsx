import db from "@/lib/db";
import { BillboardForm } from "@/components/billboards/billboard-form";
import { Billboard } from "@prisma/client";

interface PageProps {
  params: {
    billboardId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const billboard: Billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <BillboardForm billboard={billboard} />
      </div>
    </div>
  );
}
