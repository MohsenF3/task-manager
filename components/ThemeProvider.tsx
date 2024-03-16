"use client";

import { ThemeProvider } from "next-themes";
import React, { useState, useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
