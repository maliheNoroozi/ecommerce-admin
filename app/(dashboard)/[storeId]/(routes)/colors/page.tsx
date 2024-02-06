import db from "@/lib/db";
import { format } from "date-fns";
import { Colors } from "@/components/colors/colors";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Colors colors={formattedColors} />
      </div>
    </div>
  );
}
