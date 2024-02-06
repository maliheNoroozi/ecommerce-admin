import db from "@/lib/db";
import { format } from "date-fns";
import { Categories } from "@/components/categories/categories";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Categories categories={formattedCategories} />
      </div>
    </div>
  );
}
