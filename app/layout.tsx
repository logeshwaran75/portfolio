import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/portfolio";
import Providers from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = `${profile.name} | AI/ML Engineer and Software Developer`;
const description = `${profile.name} builds practical AI applications: RAG systems, computer vision pipelines and machine learning models. Currently ${profile.currentRole} at ${profile.currentCompany}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["AI engineer", "ML engineer", "RAG", "Generative AI", "Computer vision", "YOLO", "Python", "Portfolio"],
  authors: [{ name: profile.name }],
  openGraph: { title, description, type: "website", url: siteUrl },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#080B14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
