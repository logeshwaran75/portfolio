import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceSection from "@/components/ExperienceSection";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Lab from "@/components/Lab";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.currentRole,
    worksFor: { "@type": "Organization", name: profile.currentCompany },
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github].filter(Boolean),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <ExperienceSection />
        <Projects />
        <Skills />
        <Lab />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
