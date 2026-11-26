import { Award, GraduationCap } from "lucide-react";
import { achievements, certifications, education } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Credentials() {
  return (
    <section id="education" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading title="Education, certification and achievements" />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-xl border border-line bg-surface p-6">
                <GraduationCap className="text-cyan" size={22} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{education.degree}</h3>
                <p className="mt-1 text-muted">{education.school}, {education.location}</p>
                <p className="mt-3 text-sm text-muted">{education.period} · {education.detail}</p>
              </div>
            </Reveal>
            {certifications.map((c) => (
              <Reveal key={c.title} delay={0.06}>
                <div className="rounded-xl border border-line bg-surface p-6">
                  <Award className="text-violet" size={22} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-muted">{c.issuer}</p>
                  <p className="mt-3 text-sm text-muted">{c.date}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="h-full rounded-xl border border-line bg-surface p-6">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <ul className="mt-5 space-y-5">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
