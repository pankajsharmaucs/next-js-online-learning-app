// components/LoaderWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CenteredLoader from "./CenteredLoader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Delay for effect or use actual page status
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Adjust or remove based on data loading

    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) return <CenteredLoader />;

  return <>{children}</>;
}
