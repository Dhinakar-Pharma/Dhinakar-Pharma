"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AutoScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // pathname comes as "/values" or "/", we slice off the slash
    const id = pathname.replace("/", "");
    if (!id) return;
    
    // Give a slight delay to ensure the DOM elements are mounted when loading
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [pathname]);

  return null;
}
