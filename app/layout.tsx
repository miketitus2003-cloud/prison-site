// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ResearchBot from "@/components/ResearchBot";

export const metadata: Metadata = {
  title: "Prison Education & Recidivism — Michael Parham",
  description:
    "A research brief on recidivism and reentry support using post-release employment as a proxy, with related policy briefs and verified sources.",
  metadataBase: new URL("https://prison-site-omega.vercel.app"),
  openGraph: {
    title: "Prison Education & Recidivism — Michael Parham",
    description:
      "A research brief on recidivism and reentry support using post-release employment as a proxy, with related policy briefs and verified sources.",
    url: "https://prison-site-omega.vercel.app",
    siteName: "Prison Education & Recidivism",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prison Education & Recidivism — Michael Parham",
    description:
      "A research brief on recidivism and reentry support using post-release employment as a proxy, with related policy briefs and verified sources.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteShell>{children}</SiteShell>
        <ResearchBot />
      </body>
    </html>
  );
}
