"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 0.9,
      smoothWheel: true,
      syncTouch: false,
    });
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      if (typeof window !== "undefined") {
        (window as any).lenis = undefined;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
