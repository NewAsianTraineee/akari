import { usePathname } from "next/navigation";

/**
 * The section anchors (#tjanster, #boka, ...) only exist on the landing page.
 * Away from the landing page they would be dead anchors — the URL changes but
 * the page does not — so there they point back at it.
 */
export function useHomeAnchor() {
  const pathname = usePathname();
  const onLanding = pathname === "/" || pathname === "";

  return (hash: string) => (onLanding ? hash : `/${hash}`);
}
