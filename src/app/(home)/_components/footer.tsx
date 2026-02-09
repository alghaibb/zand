"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          © {year ?? ""} Zand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
