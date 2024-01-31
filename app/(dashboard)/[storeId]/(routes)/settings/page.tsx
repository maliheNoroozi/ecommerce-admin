import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import { SettingsForm } from "@/components/settings-form";

interface PageProps {
  params: {
    storeId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: { id: params.storeId, userId },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm store={store} />
      </div>
    </div>
  );
}
