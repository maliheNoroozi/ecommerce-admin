import db from "@/lib/db";
import { ProductForm } from "@/components/products/product-form";

interface PageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const productRequest = db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categoriesRequest = db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizesRequest = db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colorsRequest = db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const [product, categories, sizes, colors] = await Promise.all([
    productRequest,
    categoriesRequest,
    sizesRequest,
    colorsRequest,
  ]);

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm
          product={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}
