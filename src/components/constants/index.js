import { myOdyssey, mediqi, portfolio } from "@/assets";

const projects = [
  {
    id: 1,
    title: "My Odyssey Admin Dashboard",
    description:
      "The My Odyssey Admin Dashboard is a mockup admin dashboard that enables administrators to efficiently manage users, destinations, travel content, and other critical app operations.The dashboard was built to showcase my ability to implement real-world admin functions, with a focus on clean UI, smooth UX, and robust data management, as well as CRUD (Create, Read, Update, Delete) operations.",
    tags: [
      "React.js",
      "Next.js",
      "Tanstack Query",
      "Tailwind CSS",
      "Zod",
      "Shadcn",
    ],
    image: myOdyssey,
    demoUrl: "https://my-odyssey-dashboard.vercel.app/",
    repoUrl: "https://github.com/kenebebh/my-odyssey-dashboard",
    color: "from-purple-500 to-blue-500",
    isPrivate: false, // Public repository
  },
  {
    id: 2,
    title: "Mediq-i",
    description:
      "A telemedicine platform that enables users to connect with doctors online. I developed the landing page, including a blog section powered by Sanity.io to display articles for users. Additionally, I built the onboarding forms for doctors and the doctor portal, ensuring a seamless experience for medical professionals joining the platform.",
    tags: ["React.js", "Next.js", "Sanity.io", "Tailwind CSS", "Zod", "Shadcn"],
    image: mediqi,
    demoUrl: "https://mediqi.vercel.app/",
    repoUrl: "https://github.com/kenebebh/github-repo-retriever",
    color: "from-blue-500 to-cyan-500",
    isPrivate: true, // Private repository
  },
  {
    id: 3,
    title: "Portfolio",
    description:
      "My portfolio website is designed to showcase my skills and experience as a web developer. It has been optimized for all screens, from large desktop displays to mobile devices, ensuring that my work is accessible and user-friendly for everyone. The site is built with pixel-perfect precision, and is also fast and optimized for quick loading times.",
    tags: ["React.js", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: portfolio,
    demoUrl: "https://bebh.netlify.app/",
    repoUrl: "https://github.com/kenebebh/new-portfolio",
    color: "from-green-500 to-emerald-500",
    isPrivate: false, // Public repository
  },
];

export { projects };
