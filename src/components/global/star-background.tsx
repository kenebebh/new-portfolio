"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinking: boolean;
  blinkDuration: number;
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Generate random stars
  useEffect(() => {
    setMounted(true);
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 10000
      );

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // percentage of viewport width
          y: Math.random() * 100, // percentage of viewport height
          size: Math.random() * 2 + 1, // size between 1-3px
          opacity: Math.random() * 0.5 + 0.3, // opacity between 0.3-0.8
          blinking: Math.random() > 0.7, // 30% of stars will blink
          blinkDuration: Math.random() * 3 + 2, // blink duration between 2-5s
        });
      }

      setStars(newStars);
    };

    generateStars();

    // Regenerate stars on window resize
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

  if (!mounted) return null;

  // Don't show stars in light mode
  if (theme === "light") return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: star.opacity }}
          animate={
            star.blinking
              ? {
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                }
              : { opacity: star.opacity }
          }
          transition={
            star.blinking
              ? {
                  duration: star.blinkDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }
              : {}
          }
        />
      ))}

      {/* Add occasional shooting stars */}
      <ShootingStars />
    </div>
  );
}

function ShootingStars() {
  const [shootingStars, setShootingStars] = useState<number[]>([]);

  useEffect(() => {
    // Occasionally add a shooting star
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every interval
        setShootingStars((prev) => [...prev, Date.now()]);

        // Remove the shooting star after animation completes
        setTimeout(() => {
          setShootingStars((prev) => prev.slice(1));
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {shootingStars.map((id) => {
        // Random angle between -30 and -60 degrees (top-right to bottom-left direction)
        const angle = Math.random() * 30 + 30;
        // Random length between 100px and 200px
        const length = Math.random() * 100 + 100;

        return (
          <div
            key={id}
            className="absolute"
            style={{
              left: `${Math.random() * 70 + 10}%`,
              top: `${Math.random() * 50}%`,
              transform: `rotate(${angle}deg)`,
              zIndex: 1,
            }}
          >
            {/* Star head (brighter point) */}
            <motion.div
              className="absolute rounded-full bg-white z-10"
              style={{
                width: "2px",
                height: "2px",
                boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.7)",
                filter: "blur(0.3px)",
              }}
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: length,
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />

            {/* Star trail */}
            <motion.div
              className="absolute rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
                height: "1px",
                transformOrigin: "left center",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: length,
                opacity: [0, 0.7, 0.3, 0],
                x: [0, length * 0.2, length],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />

            {/* Subtle glow effect */}
            <motion.div
              className="absolute rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                width: "20px",
                height: "3px",
                filter: "blur(1px)",
                transformOrigin: "left center",
              }}
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, length * 0.5, length],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />
          </div>
        );
      })}
    </>
  );
}

//minimal star code with no shooting stars
// "use client";

// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";

// // Simplified star background with minimal code
// export function StarBackground() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [stars, setStars] = useState<React.JSX.Element[]>([]);

//   useEffect(() => {
//     setMounted(true);

//     // Create stars only once after component mounts
//     const createStars = () => {
//       const newStars: React.JSX.Element[] = [];
//       const starCount = 100; // Fixed number of stars

//       for (let i = 0; i < starCount; i++) {
//         // Random properties for each star
//         const size = Math.random() * 2 + 1;
//         const opacity = Math.random() * 0.5 + 0.3;

//         // Position stars within viewport using viewport units
//         const x = `${Math.random() * 95}vw`; // Keep away from edges
//         const y = `${Math.random() * 95}vh`; // Keep away from edges

//         newStars.push(
//           <div
//             key={i}
//             className="absolute rounded-full bg-white"
//             style={{
//               width: `${size}px`,
//               height: `${size}px`,
//               left: x,
//               top: y,
//               opacity: opacity,
//               animation:
//                 Math.random() > 0.7
//                   ? `blink ${Math.random() * 3 + 2}s infinite`
//                   : "none",
//             }}
//           />
//         );
//       }

//       setStars(newStars);
//     };

//     createStars();

//     // Add CSS for blinking animation
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes blink {
//         0%, 100% { opacity: var(--opacity); }
//         50% { opacity: calc(var(--opacity) * 0.3); }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   if (!mounted || theme === "light") return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         overflow: "hidden",
//         pointerEvents: "none",
//         zIndex: 0,
//       }}
//     >
//       {stars}
//     </div>
//   );
// }
