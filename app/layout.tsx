"use client";
import React from "react"; // Ensure React is imported
// import type { Metadata } from "next";
import "../app/[locale]/styles/globals.css"; // Adjust the import path as necessary
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/request"; // Adjust the import path as necessary

// export const metadata: Metadata = {
//   title: "AI KWEthu",
//   description: "Boost Your Learning with AI KWEthu",
//   generator: "v0.dev",
// };

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </html>
  );
}
