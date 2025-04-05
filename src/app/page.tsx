// import { About, Contact, Hero, Projects, Skills } from "@/components/sections";
// import { FullPageScroll } from "@/components/global";

// export default function Home() {
//   const sectionIds = ["home", "about", "projects", "skills", "contact"];

//   return (
//     <div>
//       <FullPageScroll sectionIds={sectionIds}>
//         <section id="home">
//           <Hero />
//         </section>
//         <section id="about">
//           <About />
//         </section>
//         <section id="projects">
//           <Projects />
//         </section>
//         <section id="skills">
//           <Skills />
//         </section>
//         <section id="contact">
//           <Contact />
//         </section>
//       </FullPageScroll>
//     </div>
//   );
// }

"use client";

import { About, Contact, Hero, Projects, Skills } from "@/components/sections";
import { FullPageScroll } from "@/components/global";
import { useMediaQuery } from "@/hooks";

export default function Home() {
  const sectionIds = ["home", "about", "projects", "skills", "contact"];
  const isLargeScreen = useMediaQuery("(min-width: 1024px)"); // lg breakpoint in Tailwind
  console.log(isLargeScreen);

  // For large screens, use FullPageScroll
  if (isLargeScreen) {
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

  // For mobile and tablet, use normal scrolling
  return (
    <div className="">
      <section id="home" className="min-h-screen">
        <Hero />
      </section>
      <section id="about" className="min-h-screen">
        <About />
      </section>
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
      <section id="skills" className="min-h-screen">
        <Skills />
      </section>
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    </div>
  );
}
