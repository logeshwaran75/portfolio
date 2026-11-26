"use client";
import { useCallback, useState, type CSSProperties } from "react";
import { AnimatePresence } from "motion/react";
import { FileSearch, ScanSearch, TrendingDown, UserCheck, Search, Maximize2 } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProjectModal from "./ProjectModal";

const icons = { search: Search, scan: ScanSearch, trend: TrendingDown, file: FileSearch, users: UserCheck };
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading
          title="Projects"
          intro="Five projects across retrieval, computer vision and predictive modelling. Open any card for the problem, what I built and my contribution."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.id} className={spans[i]}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    aria-haspopup="dialog"
                    style={{ "--hue": p.hue } as CSSProperties}
                    className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--hue)] hover:bg-raised"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${p.hue}, transparent)` }}
                    />
                    <span className="flex items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-[var(--hue)] transition-colors group-hover:border-[var(--hue)]"
                      >
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="text-xs text-muted">{p.period}</span>
                    </span>
                    <span className="mt-5 text-sm font-medium" style={{ color: p.hue }}>{p.kind}</span>
                    <span className="mt-1 font-display text-xl font-semibold leading-snug tracking-tight">{p.title}</span>
                    <span className="mt-3 text-sm leading-relaxed text-muted">{p.problem}</span>
                    {p.outcome && (
                      <span className="mt-4 text-sm text-text">{p.outcome}</span>
                    )}
                    <span className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-[var(--hue)]">
                      <Maximize2 size={14} aria-hidden="true" /> View details
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
}
