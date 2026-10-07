import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest Intelligence Explorer",
  description:
    "An independent research prototype exploring multimodal AI for forest monitoring and biodiversity understanding."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
