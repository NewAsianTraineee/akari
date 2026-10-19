import type { Metadata } from "next";
import { DemoConsole } from "@/components/demo/DemoConsole";

export const metadata: Metadata = {
  title: "Säkerhetskonsol",
  description:
    "Demonstration console for the restaurant booking API — shows what each secured endpoint answers and which security rule decided the outcome.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoConsole />;
}
