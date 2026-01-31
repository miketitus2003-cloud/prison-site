import "./globals.css";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Prison Education & Recidivism — Michael Parham",
  description:
    "A research brief on recidivism and reentry support using post release employment as a proxy, with related policy briefs and verified sources.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
