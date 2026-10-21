"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Översikt" },
  { href: "/admin/bookings", label: "Bokningar & schema" },
];

export function AdminSidebar({
  displayName,
  username,
}: {
  displayName: string;
  username: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-gold/10 bg-charcoal/95 p-8 shadow-[0_40px_160px_-80px_rgba(185,160,108,0.45)] lg:flex lg:flex-col">
      <div className="mb-10">
        <p className="font-display text-xl tracking-[0.22em] text-ivory">AUREUM</p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.32em] text-gold">BILVERKSTAD</p>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-sm px-4 py-2.5 text-[11px] uppercase tracking-[0.26em] transition ${
                active
                  ? "border border-gold/40 bg-gold/10 text-ivory"
                  : "border border-transparent text-ash/75 hover:text-ivory"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-10 border-t border-gold/10 pt-6">
        <p className="text-sm text-ivory">{displayName}</p>
        <p className="text-[10px] text-ash-dim">@{username}</p>
        <button
          onClick={logout}
          disabled={loading}
          className="btn btn-ghost mt-4 w-full justify-center !py-2.5 !text-[10px]"
        >
          {loading ? "Loggar ut..." : "Logga ut"}
        </button>
      </div>
    </aside>
  );
}
