"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { ChevronDown } from "lucide-react";
import { experience, type Experience } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function Card({ item, defaultOpen }: { item: Experience; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `exp-${item.id}`;
  return (
    <div className="rounded-xl border border-line bg-surface transition-colors hover:border-cyan-dim">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-xl font-semibold">{item.role}</span>
            {item.current && (
              <span className="rounded-full bg-cyan/15 px-2.5 py-0.5 text-xs font-semibold text-cyan">Current</span>
            )}
          </span>
          <span className="mt-1 block text-muted">
            {item.company}
            {item.location ? `, ${item.location}` : ""}
          </span>
          <span className="mt-1 block text-sm text-muted">{item.period}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`mt-1.5 h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
              <p className="text-muted">{item.summary}</p>
              {item.highlights.length > 0 ? (
                <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 rounded-lg border border-dashed border-line p-4 text-sm text-muted">
                  Placeholder: add responsibilities and achievements for this role in <code className="text-text">data/portfolio.ts</code>.
                </p>
              )}
              {item.tech && item.tech.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section id="experience" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading title="Experience" intro="Where I've worked on AI and machine learning applications." />
        <ol ref={ref} className="relative space-y-8 pl-8 sm:pl-12">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]" aria-hidden="true" />
          <motion.span
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-cyan sm:left-[11px]"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />
          {experience.map((item, idx) => (
            <li key={item.id} className="relative">
              <span
                className={`absolute -left-8 top-7 h-[15px] w-[15px] rounded-full border-2 sm:-left-12 sm:h-[23px] sm:w-[23px] ${
                  item.current ? "border-cyan bg-cyan/30" : "border-line bg-ink"
                }`}
                aria-hidden="true"
              />
              <Reveal delay={idx * 0.05}>
                <Card item={item} defaultOpen={idx === 0} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
