// "use client";

// import type React from "react";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Send } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { AnimateWrapper, TextReveal } from "@/helpers/animations";
// import { SectionWrapper } from "@/helpers";

// const contactPhrases = [
//   "Interested in working together?",
//   "Let's discuss your project.",
//   "What do you want to build?",
//   "Let me bring your ideas to life.",
//   "Ready to create something amazing?",
//   "Need a developer for your next project?",
//   "Let's turn your vision into reality.",
//   "Looking for technical expertise?",
// ];

// export default function ContactResponsive() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentPhrase, setCurrentPhrase] = useState(0);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate form submission
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     setIsSubmitting(false);
//     alert("Message sent! Thanks for reaching out.");

//     // Reset form
//     e.currentTarget.reset();
//   };

//   // Rotate through phrases
//   useState(() => {
//     const interval = setInterval(() => {
//       setCurrentPhrase((prev) => (prev + 1) % contactPhrases.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   });

//   return (
//     <SectionWrapper>
//       <div className="py-24">
//         <div className="px-4 flex flex-col gap-y-12 md:flex-row gap-x-6  md:items-center">
//           <div className="flex-1">
//             <AnimateWrapper
//               variant="slideRight"
//               className="flex flex-col justify-center"
//             >
//               <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit mb-6">
//                 Contact
//               </div>

//               <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>

//               <div className="mb-6">
//                 <TextReveal
//                   text={contactPhrases[currentPhrase]}
//                   className="text-2xl text-primary"
//                   key={currentPhrase}
//                   once={false}
//                 />
//               </div>

//               <p className="text-lg text-muted-foreground pt-4 mb-8">
//                 I'm always open to discussing new projects, creative ideas, or
//                 opportunities to be part of your vision. Fill out the form, and
//                 I'll get back to you as soon as possible.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                     <AnimateWrapper variant="bounce">@</AnimateWrapper>
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Email</h3>
//                     <p className="text-muted-foreground">
//                       kenebebhbanigo@gmail.com
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                     <AnimateWrapper variant="bounce" delay={0.1}>
//                       🌐
//                     </AnimateWrapper>
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Location</h3>
//                     <p className="text-muted-foreground">Remote / Worldwide</p>
//                   </div>
//                 </div>
//               </div>
//             </AnimateWrapper>
//           </div>

//           <div className="flex-1">
//             <AnimateWrapper variant="slideLeft" delay={0.2}>
//               <div className="bg-card rounded-2xl border p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input id="name" placeholder="Your name" required />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="Your email"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="message">Message</Label>
//                     <Textarea
//                       id="message"
//                       placeholder="Your message"
//                       rows={10}
//                       required
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full"
//                     size="lg"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <AnimateWrapper variant="bounce" className="mr-2">
//                           <Send className="h-4 w-4" />
//                         </AnimateWrapper>
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="mr-2 h-4 w-4" />
//                         Send Message
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               </div>
//             </AnimateWrapper>
//           </div>
//         </div>
//       </div>
//     </SectionWrapper>
//   );
// }

"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimateWrapper, TextReveal } from "@/helpers/animations";
import { SectionWrapper } from "@/helpers";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const contactPhrases = [
  "Interested in working together?",
  "Let's discuss your project.",
  "What do you want to build?",
  "Let me bring your ideas to life.",
  "Ready to create something amazing?",
  "Need a developer for your next project?",
  "Let's turn your vision into reality.",
  "Looking for technical expertise?",
];

export default function ContactResponsive() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Rotate through phrases - fixed to use useEffect instead of useState
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % contactPhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate that environment variables are available
    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ) {
      toast.error("Email service is not properly configured");
      console.error("Missing EmailJS configuration");
      setLoading(false);
      return;
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Kene",
          from_email: form.email,
          to_email: "kenebebhbanigo@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            "Thank you. I will get back to you as soon as possible."
          );

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error("Error sending email:", error);
          toast.error("Something went wrong, please try again");
        }
      );
  };

  return (
    <SectionWrapper>
      <div className="py-24">
        <div className="px-4 flex flex-col gap-y-12 md:flex-row gap-x-6 md:items-center">
          <div className="flex-1">
            <AnimateWrapper
              variant="slideRight"
              className="flex flex-col justify-center"
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit mb-6">
                Contact
              </div>

              <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>

              <div className="mb-6">
                <TextReveal
                  text={contactPhrases[currentPhrase]}
                  className="text-2xl text-primary"
                  key={currentPhrase}
                  once={false}
                />
              </div>

              <p className="text-lg text-muted-foreground pt-4 mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Fill out the form, and
                I'll get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <AnimateWrapper variant="bounce">@</AnimateWrapper>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      kenebebhbanigo@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <AnimateWrapper variant="bounce" delay={0.1}>
                      🌐
                    </AnimateWrapper>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Remote / Worldwide</p>
                  </div>
                </div>
              </div>
            </AnimateWrapper>
          </div>

          <div className="flex-1">
            <AnimateWrapper variant="slideLeft" delay={0.2}>
              <div className="bg-card rounded-2xl border p-8">
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <AnimateWrapper variant="bounce" className="mr-2">
                          <Send className="h-4 w-4" />
                        </AnimateWrapper>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimateWrapper>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
