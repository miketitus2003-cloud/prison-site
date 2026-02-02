// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ResearchBot from "@/components/ResearchBot";

const SITE_URL = "https://prison-site-omega.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Prison Policy Data Platform — Michael Parham",
    template: "%s — Michael Parham",
  },
  description:
    "I turn justice system data into public-facing insights: dashboards, short briefs, and source-verified claims.",

  applicationName: "Prison Policy Data Platform",
  authors: [{ name: "Michael Parham" }],
  creator: "Michael Parham",

  openGraph: {
    title: "Prison Policy Data Platform — Michael Parham",
    description:
      "Dashboards • Policy briefs • Source-verified insights built from primary justice statistics.",
    url: SITE_URL,
    siteName: "Prison Policy Data Platform",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Prison Policy Data Platform — dashboards + verified sources",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Prison Policy Data Platform — Michael Parham",
    description:
      "Dashboards • Policy briefs • Source-verified insights built from primary justice statistics.",
    images: ["/og.png"],
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#06080f] text-white antialiased">
        <SiteShell>
          {children}
          <ResearchBot />
        </SiteShell>
      </body>
    </html>
  );
}
