import { useEffect, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

/**
 * React hook that tracks online/offline connectivity status.
 * Uses `useSyncExternalStore` for tear-free reads of `navigator.onLine`.
 */
export function useOnlineStatus(): boolean {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // Force a re-check on mount in case the status changed before hydration
    if (!navigator.onLine) {
      window.dispatchEvent(new Event("offline"));
    }
  }, []);

  return isOnline;
}
