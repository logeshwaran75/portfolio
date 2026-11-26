"use client";
import { MotionConfig } from "motion/react";
import Loader from "./Loader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Loader />
      {children}
    </MotionConfig>
  );
}
