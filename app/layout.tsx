import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth Roadmap · Homeopathic Plus Centre",
  description: "A phased strategy to grow to 14 patients per week — prepared by Abhi Chand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
