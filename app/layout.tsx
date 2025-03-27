import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Organic Foods Marketplace",
  description: "Simple online marketplace for organic foods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
