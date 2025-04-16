import { myOdyssey, mediqi, portfolio, bookum } from "@/assets";

const projects = [
  {
    id: 1,
    title: "Bookum",
    description:
      "A social platform for book lovers to host private/public book clubs, share book blogs, join real-time discussions, and track reading progress. I built the responsive landing page and a real-time admin dashboard integrated with APIs and interactive charts. I also implemented role-based authentication, secure sessions with JWT, and contributed to key UI/UX decisions to enhance user and admin experiences.",
    tags: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "TypeScript",
    ],
    image: bookum,
    demoUrl: "https://www.bookumapp.com/",
    repoUrl: "",
    color: "from-blue-500 to-cyan-500",
    isPrivate: true, // Private repository
  },
  {
    id: 2,
    title: "Mediq-i",
    description:
      "A telemedicine platform that enables users to connect with doctors online. I developed the landing page, including a blog section powered by Sanity.io to display articles for users. Additionally, I built the onboarding forms for doctors and the doctor portal, ensuring a seamless experience for medical professionals joining the platform.",
    tags: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Sanity.io",
      "Tailwind CSS",
      "Zod",
      "Shadcn",
    ],
    image: mediqi,
    demoUrl: "https://mediqihealth.netlify.app/",
    repoUrl: "",
    color: "from-blue-500 to-cyan-500",
    isPrivate: true, // Private repository
  },
  {
    id: 3,
    title: "My Odyssey Admin Dashboard",
    description:
      "The My Odyssey Admin Dashboard is a mockup admin dashboard that enables administrators to efficiently manage users, destinations, travel content, and other critical app operations.The dashboard was built to showcase my ability to implement real-world admin functions, with a focus on clean UI, smooth UX, and robust data management, as well as CRUD (Create, Read, Update, Delete) operations.",
    tags: [
      "React.js",
      "Next.js",
      "TypeScript",
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
    id: 4,
    title: "Portfolio",
    description:
      "My portfolio is more than just a collection of projects—it's a reflection of my love for crafting websites that feel good to use and leave a lasting impression. Every section is thoughtfully designed to be engaging, informative, and accessible across all devices. Built with attention to detail and a focus on performance, the site loads quickly and showcases my commitment to creating web experiences that are both beautiful and purposeful.",
    tags: ["React.js", "Next.js", "Framer Motion", "Tailwind CSS"],
    image: portfolio,
    demoUrl: "https://bebh.netlify.app/",
    repoUrl: "https://github.com/kenebebh/new-portfolio",
    color: "from-green-500 to-emerald-500",
    isPrivate: false, // Public repository
  },
];

export { projects };
