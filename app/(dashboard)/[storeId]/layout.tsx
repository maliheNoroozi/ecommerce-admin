import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Header } from "@/components/header";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
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
    <div>
      <Header />
      {children}
    </div>
  );
}
