import { redirect } from "next/navigation";
import { getCurrentSession } from "@/server/auth";
import { LoginForm } from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inloggning",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getCurrentSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-noir px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-display text-2xl tracking-[0.22em] text-ivory">AUREUM</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-gold">BILVERKSTAD</p>
          <p className="mt-6 text-sm text-ash-dim">Verkstadspanel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
