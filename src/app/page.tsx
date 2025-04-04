import { About, Contact, Hero, Projects, Skills } from "@/components/sections";
import { FullPageScroll } from "@/components/global";

export default function Home() {
  const sectionIds = ["home", "about", "projects", "skills", "contact"];

  return (
    <div className="mt-16">
      <FullPageScroll sectionIds={sectionIds}>
        <section id="home" className="bg-blue-500">
          <Hero />
        </section>
        <section id="about" className="bg-green-500">
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
