"use client";

import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return "";
  return origin;
};
