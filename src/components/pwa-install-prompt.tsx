"use client";

import { Download, Share, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const DISMISS_KEY = "zand_pwa_install_dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Detects iOS Safari where beforeinstallprompt is not supported.
 * Shows manual instructions instead.
 */
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as Navigator & { standalone: boolean }).standalone)
  );
}

function wasDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const timestamp = parseInt(raw, 10);
    if (Date.now() - timestamp < DISMISS_DURATION_MS) return true;
    localStorage.removeItem(DISMISS_KEY);
    return false;
  } catch (error) {
    console.error("Failed to read dismiss state:", error);
    return false;
  }
}

function setDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  } catch (error) {
    console.error("Failed to save dismiss state:", error);
  }
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already installed or recently dismissed
    if (isStandalone() || wasDismissed()) return;

    // iOS Safari — no beforeinstallprompt, show manual instructions
    if (isIOS()) {
      // Delay showing so it doesn't appear instantly on page load
      const timer = setTimeout(() => setShowIOSPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  // Animate in after prompt is ready
  useEffect(() => {
    if (deferredPrompt || showIOSPrompt) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [deferredPrompt, showIOSPrompt]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setVisible(false);
      }
    } catch (error) {
      console.error("Install prompt error:", error);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setDismissed();
    setVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setDeferredPrompt(null);
      setShowIOSPrompt(false);
    }, 300);
  }, []);

  if (!deferredPrompt && !showIOSPrompt) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 p-4 transition-all duration-300 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-md rounded-2xl bg-background border border-border shadow-2xl p-5">
        <div className="flex items-start gap-4">
          {/* App Icon */}
          <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
            <span className="text-white font-poppins font-bold text-lg">Z</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-poppins font-semibold text-sm text-foreground">
                  Install Zand
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add to your home screen for quick access
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="shrink-0 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Dismiss install prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3">
              {showIOSPrompt ? (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tap{" "}
                  <Share className="inline w-3.5 h-3.5 text-blue-500 -mt-0.5" />{" "}
                  then <strong>&quot;Add to Home Screen&quot;</strong>
                </p>
              ) : (
                <button
                  onClick={handleInstall}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Install App
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
