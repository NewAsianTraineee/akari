import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentSession } from "@/server/auth";
import { AdminSidebar } from "./AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Verkstadspanel — Aureum",
    template: "%s — Aureum Bilverkstad",
  },
  robots: { index: false, follow: false },
};

export default async function ConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentSession();
  if (!session) redirect("/admin/login");

  const displayName = session.displayName ?? session.username;

  return (
    <div className="flex min-h-[100svh] bg-noir text-ivory">
      <AdminSidebar displayName={displayName} username={session.username} />
      <main className="flex-1 lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          {children}
        </div>
      </main>
      <Link href="/" className="sr-only">
        Till startsidan
      </Link>
    </div>
  );
}
