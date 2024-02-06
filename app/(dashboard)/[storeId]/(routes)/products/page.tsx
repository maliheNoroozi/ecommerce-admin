import db from "@/lib/db";
import { format } from "date-fns";
import { Products } from "@/components/products/products";
import { currencyFormatter } from "@/lib/utils";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: currencyFormatter().format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <Products products={formattedProducts} />
      </div>
    </div>
  );
}
