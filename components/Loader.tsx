"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/portfolio";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setVisible(false), reduce ? 0 : 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="font-display text-2xl font-semibold tracking-tight">{profile.name}</span>
          <span className="h-px w-40 overflow-hidden bg-line">
            <motion.span
              className="block h-full w-full origin-left bg-cyan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
