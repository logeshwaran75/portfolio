"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "lab", label: "Lab" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    const hero = document.getElementById("top");
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Scroll once the menu has finished closing. Unmounting the focused link mid-scroll would otherwise cancel it.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }, 320);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  active === l.id ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded bg-cyan transition-transform duration-300 ease-out ${
                    active === l.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-text md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-line bg-ink md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="container-page flex flex-col py-3">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => goTo(e, l.id)}
                    className={`block rounded-md px-2 py-3 text-base ${
                      active === l.id ? "text-cyan" : "text-text"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
