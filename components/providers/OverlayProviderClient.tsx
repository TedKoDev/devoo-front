"use client";

import { OverlayProvider } from "@toss/use-overlay";

export default function OverlayProviderClient({ children }: { children: React.ReactNode }) {
  return <OverlayProvider>{children}</OverlayProvider>;
}
