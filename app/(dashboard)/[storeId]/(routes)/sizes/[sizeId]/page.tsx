import db from "@/lib/db";
import { SizeForm } from "@/components/sizes/size-form";

interface PageProps {
  params: {
    sizeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <SizeForm size={size} />
      </div>
    </div>
  );
}
