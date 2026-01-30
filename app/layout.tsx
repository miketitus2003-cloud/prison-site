import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Prison Education and Recidivism - Michael Parham",
  description:
    "Research brief on recidivism and reentry support using post-release employment as a proxy, plus short policy notes on youth sentencing and solitary confinement.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
