import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/helpers/ThemeProvider";
import Navbar from "@/components/layout/navbar";
import { StarBackground, GlobalLoadingProvider } from "@/components/global";
import { Toaster } from "@/components/ui/sonner";

const loraSans = Lora({
  variable: "--font-lora-sans",
  subsets: ["latin"],
});

// const geist = Geist({
//   variable: "--font-geist",
//   subsets: ["latin"],
//   display: "swap",
// });

// const playfair = Playfair_Display({
//   variable: "--font-playfair",
//   subsets: ["latin"],
//   display: "swap",
// });

// const lato = Lato({
//   variable: "--font-lato",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["300", "400", "700", "900"],
// });

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
          <GlobalLoadingProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <Toaster position="top-right" richColors />
              <div className="flex-1">{children}</div>
            </div>
          </GlobalLoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
