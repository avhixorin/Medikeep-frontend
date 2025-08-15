/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// This array holds all the provider components and their initial props.
// To add a new provider, simply add a new entry to this array.
const providers: Array<[React.ElementType, Omit<any, "children">]> = [
  [
    NextThemesProvider,
    {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      disableTransitionOnChange: true,
    },
  ],
];

export function Providers({ children }: { children: React.ReactNode }) {
  return providers.reduceRight((acc, [Provider, props]) => {
    return <Provider {...props}>{acc}</Provider>;
  }, children);
}
