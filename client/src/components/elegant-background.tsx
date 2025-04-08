"use client";

import { useEffect, useState } from "react";

export function ElegantBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* זריקות דיו */}
      <div className="ink-drops absolute inset-0 opacity-[0.12] dark:opacity-[0.08]" />

      {/* נוצות עדינות */}
      <div className="feather-touches absolute inset-0 opacity-[0.07] dark:opacity-[0.05]" />
    </div>
  );
}
