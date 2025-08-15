/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

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
  return (
    <AuthProvider>
      {providers.reduceRight((acc, [Provider, props]) => {
        return <Provider {...props}>{acc}</Provider>;
      }, children)}
    </AuthProvider>
  );
}
