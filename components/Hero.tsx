"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Download, FolderOpen } from "lucide-react";
import { profile } from "@/data/portfolio";
import ParticleField from "./ParticleField";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % profile.rotating.length), 2400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : fieldY }} className="absolute -inset-y-24 inset-x-0 [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_75%)]">
        <ParticleField />
      </motion.div>

      <motion.div style={{ y: reduce ? 0 : textY }} className="container-page relative z-10 pb-16 pt-28">
        <motion.p
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-sm text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
        >
          <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden="true" />
          {profile.currentRole} at {profile.currentCompany}
        </motion.p>

        <motion.h1
          className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          {profile.name}
        </motion.h1>

        <motion.div
          className="mt-4 text-xl text-muted sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <p>{profile.roles.join(", ")}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-text">
            <span className="text-muted">Interested in</span>
            <span className="relative inline-block min-w-[13ch] text-cyan" aria-live="off">
              <AnimatePresence mode="wait">
                <motion.span
                  key={profile.rotating[i]}
                  className="inline-block"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  {profile.rotating[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
        </motion.div>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a href="#projects" className="btn btn-primary">
            <FolderOpen size={18} aria-hidden="true" /> View projects
          </a>
          <a href={profile.resume} download className="btn btn-ghost">
            <Download size={18} aria-hidden="true" /> Download resume
          </a>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-lg border border-line p-3 text-muted transition-colors hover:border-cyan hover:text-cyan">
            <LinkedinIcon className="h-[18px] w-[18px]" />
          </a>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded-lg border border-line p-3 text-muted transition-colors hover:border-cyan hover:text-cyan">
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
