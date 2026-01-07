import Link from "next/link";
import { Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-4 md:px-6">
      <div className="mx-auto max-w-7xl flex flex-col gap-6 border-t py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Banigo Kenebebh • Thoughtfully crafted with passion,
            precision and love❤️
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/BanigoKene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/kenebebh-banigo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://wa.me/+2348148531411"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle size={20} />
              <span className="sr-only">WhatsApp</span>
            </Link>
            <Link
              href="https://github.com/kenebebh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
