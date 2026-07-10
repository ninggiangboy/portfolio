"use client";

import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";

function shouldShowProgress(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  return (
    /^\/(en|vi)\/?$/.test(pathname) || /^\/(en|vi)\/blog\/[^/]+$/.test(pathname)
  );
}

export function PageScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const isVisible = shouldShowProgress(pathname);
  const frameRef = useRef<number | null>(null);

  const measureProgress = useEffectEvent(() => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }

    setProgress(Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100));
  });

  const scheduleProgressUpdate = useEffectEvent(() => {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      measureProgress();
    });
  });

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    measureProgress();
    window.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleProgressUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isVisible, measureProgress, scheduleProgressUpdate]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="h-[2px] overflow-hidden bg-line/50">
      <div
        className="h-full origin-left bg-accent transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
