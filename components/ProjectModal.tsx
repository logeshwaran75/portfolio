"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { GithubIcon } from "./Icons";
import { ExternalLink } from "lucide-react";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-line bg-surface sm:rounded-2xl"
        style={{ borderTopColor: project.hue }}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <p className="text-sm font-medium" style={{ color: project.hue }}>
              {project.period ? `${project.kind} · ${project.period}` : project.kind}
            </p>
            <h3 id="project-title" className="mt-1 text-2xl font-semibold tracking-tight">
              {project.title}
            </h3>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details" className="rounded-md p-1.5 text-muted hover:text-text">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6 p-6 text-sm leading-relaxed sm:text-base">
          <Block title="Problem">{project.problem}</Block>
          <Block title="What I built">{project.built}</Block>
          <Block title="My contribution">
            <ul className="space-y-2">
              {project.contribution.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.hue }} aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Block>
          {project.outcome && <Block title="Outcome">{project.outcome}</Block>}
          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </Block>

          <div className="flex flex-wrap gap-3 border-t border-line pt-5">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GithubIcon className="h-4 w-4" /> Source code
              </a>
            ) : (
              <span className="btn cursor-not-allowed border border-dashed border-line text-muted" aria-disabled="true">
                <GithubIcon className="h-4 w-4" /> Repository link not added yet
              </span>
            )}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink size={16} aria-hidden="true" /> Live demo
              </a>
            ) : (
              <span className="btn cursor-not-allowed border border-dashed border-line text-muted" aria-disabled="true">
                No live demo
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 font-display text-base font-semibold">{title}</h4>
      <div className="text-muted">{children}</div>
    </div>
  );
}
