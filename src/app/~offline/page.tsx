"use client";

import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-8 h-8 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-bold font-poppins tracking-tight mb-2">
          You&apos;re offline
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          It looks like you&apos;ve lost your internet connection. Check your
          connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
