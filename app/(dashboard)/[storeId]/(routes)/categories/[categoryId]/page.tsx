import db from "@/lib/db";
import { CategoryForm } from "@/components/categories/category-form";
import { Category } from "@prisma/client";

interface PageProps {
  params: {
    storeId: string;
    categoryId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const category: Category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <CategoryForm category={category} billboards={billboards} />
      </div>
    </div>
  );
}
