"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useIntlayer } from "next-intlayer";
import { useEffect, useEffectEvent, useState } from "react";

function shouldShowScrollTop(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  return (
    /^\/(en|vi)\/?$/.test(pathname) ||
    /^\/(en|vi)\/notes\/[^/]+$/.test(pathname)
  );
}

export function PageScrollTop() {
  const { ui } = useIntlayer("blog");
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isVisible = shouldShowScrollTop(pathname);

  const updateScrollState = useEffectEvent(() => {
    setShowScrollTop(window.scrollY > 640);
  });

  useEffect(() => {
    if (!isVisible) {
      setShowScrollTop(false);
      return;
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [isVisible, updateScrollState]);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {showScrollTop ? (
        <motion.button
          key="page-scroll-top"
          type="button"
          aria-label={String(ui.scrollToTopLabel)}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
            mass: 0.8,
          }}
          className="fixed right-6 bottom-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-background/92 text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUp size={18} weight="bold" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
