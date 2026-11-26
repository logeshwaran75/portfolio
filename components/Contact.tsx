"use client";
import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./Icons";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (v.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
  return e;
}

export default function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (errors[k]) setErrors(validate(next));
    setPrepared(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = (["name", "email", "message"] as const).find((k) => errs[k]);
      if (first) document.getElementById(`c-${first}`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
    setPrepared(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the address is visible on the page */
    }
  };

  const field = "w-full rounded-lg border bg-ink px-4 py-3 text-base text-text placeholder:text-muted/60 focus:border-cyan focus:outline-none";

  return (
    <section id="contact" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading
          title="Let's talk about AI projects and opportunities"
          intro="I'm happy to hear about roles, collaborations or questions about my work."
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-cyan">
                  <Mail size={20} className="text-cyan" aria-hidden="true" />
                  <span className="break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-cyan">
                  <LinkedinIcon className="h-5 w-5 text-cyan" />
                  <span>LinkedIn</span>
                </a>
              </li>
              {profile.github && (
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-cyan">
                    <GithubIcon className="h-5 w-5 text-cyan" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div>
                <label htmlFor="c-name" className="mb-2 block text-sm font-medium">Your name</label>
                <input id="c-name" name="name" autoComplete="name" value={values.name} onChange={set("name")}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined}
                  className={`${field} ${errors.name ? "border-red-400" : "border-line"}`} />
                {errors.name && <p id="c-name-err" role="alert" className="mt-1.5 text-sm text-red-300">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block text-sm font-medium">Your email</label>
                <input id="c-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined}
                  className={`${field} ${errors.email ? "border-red-400" : "border-line"}`} />
                {errors.email && <p id="c-email-err" role="alert" className="mt-1.5 text-sm text-red-300">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="c-message" className="mb-2 block text-sm font-medium">Message</label>
                <textarea id="c-message" name="message" rows={5} value={values.message} onChange={set("message")}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined}
                  className={`${field} resize-y ${errors.message ? "border-red-400" : "border-line"}`} />
                {errors.message && <p id="c-message-err" role="alert" className="mt-1.5 text-sm text-red-300">{errors.message}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn btn-primary">
                  <Send size={16} aria-hidden="true" /> Open email draft
                </button>
                <button type="button" onClick={copy} className="btn btn-ghost">
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  {copied ? "Copied" : "Copy email address"}
                </button>
              </div>
              <p className="text-sm text-muted" role="status">
                {prepared
                  ? `Your email app should open with the message filled in. If nothing opened, copy my address (${profile.email}) and send it from your email.`
                  : "This opens a draft in your email app. Nothing is sent until you press send there."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
