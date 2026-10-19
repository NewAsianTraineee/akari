import { usePathname } from "next/navigation";

/**
 * The section anchors (#menu, #reserve, ...) only exist on the landing page.
 * On /demo every one of them is a dead anchor, which leaves the visitor
 * stuck: the URL changes but the page does not. Away from the landing page
 * they therefore point back at it.
 */
export function useHomeAnchor() {
  const pathname = usePathname();
  const onLanding = pathname === "/" || pathname === "";

  return (hash: string) => (onLanding ? hash : `/${hash}`);
}
