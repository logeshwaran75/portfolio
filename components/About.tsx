import { about } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading title="From data science internship to building AI applications" />
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-prose space-y-5 text-base leading-[1.8] text-muted sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-line border-y border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
