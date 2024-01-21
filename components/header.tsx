import { redirect } from "next/navigation";
import db from "@/lib/db";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  auth,
} from "@clerk/nextjs";
import { StoreSwitcher } from "@/components/store-switcher";
import { Navbar } from "@/components/navbar";

export async function Header() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: { userId },
  });

  return (
    <header className="border-b p-4 flex items-center">
      <StoreSwitcher stores={stores} />
      <Navbar className="mx-6" />
      <div className="ml-auto ">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
