import Reveal from "./Reveal";

export default function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
