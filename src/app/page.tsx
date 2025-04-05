import { About, Contact, Hero, Projects, Skills } from "@/components/sections";
import { FullPageScroll } from "@/components/global";

export default function Home() {
  const sectionIds = ["home", "about", "projects", "skills", "contact"];

  return (
    <div>
      <FullPageScroll sectionIds={sectionIds}>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </FullPageScroll>
    </div>
  );
}
