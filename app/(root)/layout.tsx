import { Header } from "@/components/header";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: { userId },
  });
  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <main>
      <Header />
      <div>{children}</div>
    </main>
  );
}
