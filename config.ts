// src/config.ts
export const locales = ["en", "zu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
