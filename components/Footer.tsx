import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col gap-2 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js, TypeScript, Tailwind CSS and Motion.</p>
      </div>
    </footer>
  );
}
