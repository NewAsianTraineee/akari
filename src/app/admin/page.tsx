import { redirect } from "next/navigation";
import { getCurrentSession } from "@/server/auth";

export default async function AdminRootPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/admin/login");
  redirect("/admin/overview");
}
