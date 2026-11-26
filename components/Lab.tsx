"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, RotateCcw, Database, Filter, Binary, Crosshair, Sparkles, type LucideIcon } from "lucide-react";
import { scenarios } from "@/data/lab";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const stageIcons: LucideIcon[] = [Database, Filter, Binary, Crosshair, Sparkles];

export default function Lab() {
  const [sid, setSid] = useState(scenarios[0].id);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scenario = scenarios.find((s) => s.id === sid)!;
  const stage = scenario.stages[step];

  const clear = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => clear, []);

  const run = () => {
    clear();
    setStep(0);
    setRunning(true);
    let n = 0;
    timer.current = setInterval(() => {
      n += 1;
      if (n >= scenario.stages.length) {
        clear();
        setRunning(false);
        return;
      }
      setStep(n);
    }, 1300);
  };

  const reset = () => {
    clear();
    setRunning(false);
    setStep(0);
  };

  const pick = (id: string) => {
    reset();
    setSid(id);
  };

  const jump = (i: number) => {
    clear();
    setRunning(false);
    setStep(i);
  };

  return (
    <section id="lab" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading
          title="Interactive lab: how data moves through an AI application"
          intro="Choose a type of system, then run the walkthrough or click any stage. This is an illustration of the workflow. No model is running in your browser, and the sample values are made up."
        />

        <Reveal>
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
            <div role="tablist" aria-label="System type" className="flex flex-wrap gap-2">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={s.id === sid}
                  onClick={() => pick(s.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    s.id === sid ? "border-cyan bg-cyan/10 text-cyan" : "border-line text-muted hover:text-text"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">{scenario.blurb}</p>

            {/* Pipeline */}
            <ol className="mt-10 flex items-start" aria-label="Pipeline stages">
              {scenario.stages.map((s, i) => {
                const Icon = stageIcons[i];
                const reached = i <= step;
                const current = i === step;
                return (
                  <li key={`${sid}-${s.short}`} className="flex flex-1 items-start last:flex-none">
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={current ? "step" : undefined}
                      aria-label={`${s.title}`}
                      className="group flex w-14 flex-col items-center gap-2 sm:w-20"
                    >
                      <motion.span
                        animate={{ scale: current ? 1.12 : 1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 22 }}
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors sm:h-14 sm:w-14 ${
                          current
                            ? "border-cyan bg-cyan/15 text-cyan"
                            : reached
                            ? "border-cyan-dim text-cyan"
                            : "border-line text-muted group-hover:border-muted"
                        }`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </motion.span>
                      <span className={`text-xs sm:text-sm ${current ? "text-text" : "text-muted"}`}>{s.short}</span>
                    </button>
                    {i < scenario.stages.length - 1 && (
                      <span className="relative mt-6 h-0.5 flex-1 overflow-hidden rounded bg-line sm:mt-7" aria-hidden="true">
                        <motion.span
                          className="absolute inset-0 origin-left bg-cyan"
                          initial={false}
                          animate={{ scaleX: i < step ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Detail */}
            <div className="mt-10 min-h-[11rem] rounded-xl border border-line bg-ink/60 p-5 sm:p-6" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sid}-${step}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-sm text-muted">Stage {step + 1} of {scenario.stages.length}</p>
                  <h3 className="mt-1 text-xl font-semibold">{stage.title}</h3>
                  <p className="mt-3 max-w-prose leading-relaxed text-muted">{stage.text}</p>
                  <p className="mt-4 inline-block rounded-md border border-line bg-surface px-3 py-2 text-sm text-cyan">
                    {stage.sample} <span className="text-muted">(illustrative)</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={run} disabled={running} className="btn btn-primary disabled:opacity-60">
                <Play size={16} aria-hidden="true" /> {running ? "Running…" : "Run walkthrough"}
              </button>
              <button type="button" onClick={reset} className="btn btn-ghost">
                <RotateCcw size={16} aria-hidden="true" /> Reset
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
