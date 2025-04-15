"use client";

import type React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  disabled?: boolean;
}

export function TooltipWrapper({
  children,
  content,
  side = "top",
  align = "center",
  disabled = false,
}: TooltipWrapperProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
