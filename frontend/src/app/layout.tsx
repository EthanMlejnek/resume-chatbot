import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ethan | Resume AI",
  description:
    "Ask my AI assistant anything about my background, experience, and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}