import db from "@/lib/db";
import { ColorForm } from "@/components/colors/color-form";

interface PageProps {
  params: {
    colorId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col gap-6">
      <div className="flex-1 space-y-4 p-8">
        <ColorForm color={color} />
      </div>
    </div>
  );
}
