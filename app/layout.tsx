import "./globals.css";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Prison Education and Recidivism - Michael Parham",
  description:
    "Research brief on recidivism and reentry support using post-release employment as a proxy, plus policy notes on youth sentencing and solitary confinement.",
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
