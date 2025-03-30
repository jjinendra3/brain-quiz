import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brain Blitz Quiz",
  description: "Test Your Knowledge with Brain Blitz Quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
