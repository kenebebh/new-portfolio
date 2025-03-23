import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/helpers/ThemeProvider";
import Navbar from "@/components/layout/navbar";
import { PageTransition, StarBackground } from "@/components/global";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const loraSans = Lora({
  variable: "--font-lora-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Banigo Kene's Portfolio",
  description: "Welcome, I hope you like it here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${loraSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StarBackground />
          <PageTransition>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
            </div>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
