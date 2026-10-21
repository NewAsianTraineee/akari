"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Inloggning misslyckades");
      }
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-sm border border-gold/20 bg-charcoal/70 p-8 shadow-[0_40px_160px_-80px_rgba(185,160,108,0.4)]">
      <div>
        <label className="block text-[10px] uppercase tracking-[0.28em] text-ash-dim">
          Användarnamn
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 w-full rounded-sm border border-gold/15 bg-noir/70 px-4 py-2.5 text-ivory outline-none ring-gold/30 transition placeholder:text-ash-dim focus:ring-2"
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-[0.28em] text-ash-dim">
          Lösenord
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-sm border border-gold/15 bg-noir/70 px-4 py-2.5 text-ivory outline-none ring-gold/30 transition placeholder:text-ash-dim focus:ring-2"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>
      {error && <p className="text-xs text-gold">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-gold w-full justify-center"
      >
        {loading ? "Loggar in..." : "Logga in"}
      </button>
      <p className="text-center text-[10px] text-ash-dim">
        Standard: admin / admin (ändra via ADMIN_PASSWORD)
      </p>
    </form>
  );
}
