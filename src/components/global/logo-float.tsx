"use client";

import { motion } from "framer-motion";

interface LogoFloatProps {
  size?: number;
  className?: string;
}

export function LogoFloat({ size = 60, className = "" }: LogoFloatProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Floating 3D Cube SVG */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <defs>
          {/* Create linear gradients for each face to simulate lighting */}
          <linearGradient id="frontFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C4DFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#4B2C92" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3CD7" stopOpacity="1" />
            <stop offset="100%" stopColor="#4B2C92" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6434B4" stopOpacity="1" />
            <stop offset="100%" stopColor="#4B2C92" stopOpacity="0.7" />
          </linearGradient>

          {/* Add filter for subtle shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {/* Top face */}
        <path
          d="M50 5L87.5 25L50 45L12.5 25L50 5Z"
          fill="url(#topFace)"
          stroke="#9C4DFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadow)"
        />

        {/* Front face */}
        <path
          d="M50 45L87.5 25V75L50 95V45Z"
          fill="url(#frontFace)"
          stroke="#9C4DFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadow)"
        />

        {/* Right face */}
        <path
          d="M50 45L12.5 25V75L50 95V45Z"
          fill="url(#rightFace)"
          stroke="#9C4DFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadow)"
        />

        {/* Circuit patterns on top face */}
        <path
          d="M50 5L50 45M12.5 25L87.5 25"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.6"
          strokeDasharray="2,2"
        />

        {/* Circuit patterns on front face */}
        <path
          d="M50 45L50 95M87.5 25L50 45M87.5 75L50 95"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          strokeDasharray="2,2"
        />

        {/* Circuit patterns on right face */}
        <path
          d="M12.5 25L50 45M12.5 75L50 95"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.4"
          strokeDasharray="2,2"
        />

        {/* Circuit nodes - brighter points */}
        <circle cx="50" cy="5" r="2" fill="#FFFFFF" />
        <circle cx="87.5" cy="25" r="2" fill="#FFFFFF" />
        <circle cx="87.5" cy="75" r="2" fill="#FFFFFF" />
        <circle cx="50" cy="95" r="2" fill="#FFFFFF" />
        <circle cx="12.5" cy="75" r="2" fill="#FFFFFF" />
        <circle cx="12.5" cy="25" r="2" fill="#FFFFFF" />
        <circle cx="50" cy="45" r="2" fill="#FFFFFF" />

        {/* Inner circuit details - front face */}
        <path
          d="M70 45L70 85M70 85L60 90M60 90L60 70M60 70L70 65"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />

        {/* Inner circuit details - right face */}
        <path
          d="M30 45L30 85M30 85L40 90M40 90L40 70M40 70L30 65"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />

        {/* Inner circuit details - top face */}
        <path
          d="M30 15L70 35M70 35L60 25M60 25L40 15M40 15L30 25"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />

        {/* Inner circuit nodes */}
        <circle cx="70" cy="45" r="1" fill="#FFFFFF" />
        <circle cx="70" cy="85" r="1" fill="#FFFFFF" />
        <circle cx="60" cy="90" r="1" fill="#FFFFFF" />
        <circle cx="60" cy="70" r="1" fill="#FFFFFF" />
        <circle cx="30" cy="45" r="1" fill="#FFFFFF" />
        <circle cx="30" cy="85" r="1" fill="#FFFFFF" />
        <circle cx="40" cy="90" r="1" fill="#FFFFFF" />
        <circle cx="40" cy="70" r="1" fill="#FFFFFF" />
        <circle cx="30" cy="15" r="1" fill="#FFFFFF" />
        <circle cx="70" cy="35" r="1" fill="#FFFFFF" />
        <circle cx="60" cy="25" r="1" fill="#FFFFFF" />
        <circle cx="40" cy="15" r="1" fill="#FFFFFF" />
      </motion.svg>
    </div>
  );
}
