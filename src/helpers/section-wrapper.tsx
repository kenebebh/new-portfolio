import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
}

export default function SectionWrapper({ children }: SectionWrapperProps) {
  return <div className="h-screen w-full">{children}</div>;
}
