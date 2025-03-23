import { About, Contact, Hero, Projects, Skills } from "@/components/sections";

export default function Home() {
  return (
    <div className="mt-16">
      <section id="home" className="section">
        <Hero />
      </section>
      <section id="about" className="section">
        <About />
      </section>
      <section id="projects" className="section">
        <Projects />
      </section>
      <section id="skills" className="section">
        <Skills />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>{" "}
    </div>
  );
}
