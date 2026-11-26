import { Brain, Cloud, Code2, Cpu, Database, Eye, Server, Sparkles, type LucideIcon } from "lucide-react";
import { skillGroups, softSkills } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = {
  code: Code2, brain: Brain, cpu: Cpu, sparkles: Sparkles, eye: Eye, server: Server, database: Database, cloud: Cloud,
};

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading
          title="Technical skills"
          intro="The tools and techniques listed on my resume, grouped by what I use them for."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <li key={g.title}>
                <Reveal delay={(i % 4) * 0.05} className="h-full">
                  <div className="group h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-cyan-dim">
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-cyan" aria-hidden="true" />
                      <h3 className="font-display text-base font-semibold">{g.title}</h3>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li key={s} className="chip transition-colors hover:border-cyan hover:text-text">{s}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <Reveal className="mt-8">
          <p className="text-sm text-muted">
            <span className="font-medium text-text">Also: </span>
            {softSkills.join(", ")}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
