import { About, Contact, Hero, Projects, Skills } from "@/components/sections";
import { FullPageScroll } from "@/components/global";

export default function Home() {
  return (
    <div className="mt-16">
      {/* <FullPageScroll
        sectionIds={["home", "about", "projects", "skills", "contact"]}
      > */}
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
      </section>
      {/* </FullPageScroll> */}
    </div>
  );
}
