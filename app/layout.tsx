import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "AI KWEthu",
  description: "Boost Your Learning with AI KWEthu",
  generator: "v0.dev",
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
