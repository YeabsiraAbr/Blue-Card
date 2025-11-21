import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blue-Card - Digital Credit & Payment",
  description: "Digital credit and payment product for Ethiopia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

