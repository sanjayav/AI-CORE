"use client";

import { motion } from "framer-motion";

interface MistralIconProps {
  className?: string;
  animate?: boolean;
}

export function MistralIcon({ className = "w-16 h-16", animate = false }: MistralIconProps) {
  const iconVariants = animate ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  } : {};

  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...iconVariants}
    >
      {/* Mistral-style geometric M shape */}
      <g>
        {/* Left pillar */}
        <motion.path
          d="M15 20 L15 80 L25 80 L25 20 Z"
          fill="currentColor"
          initial={animate ? { opacity: 0, y: 20 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
        />
        
        {/* Left diagonal */}
        <motion.path
          d="M25 20 L45 60 L55 60 L35 20 Z"
          fill="currentColor"
          initial={animate ? { opacity: 0, scale: 0.8 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        
        {/* Right diagonal */}
        <motion.path
          d="M65 20 L45 60 L55 60 L75 20 Z"
          fill="currentColor"
          initial={animate ? { opacity: 0, scale: 0.8 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        
        {/* Right pillar */}
        <motion.path
          d="M75 20 L75 80 L85 80 L85 20 Z"
          fill="currentColor"
          initial={animate ? { opacity: 0, y: 20 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        
        {/* Center accent dot */}
        <motion.circle
          cx="50"
          cy="70"
          r="5"
          fill="currentColor"
          initial={animate ? { opacity: 0, scale: 0 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
      </g>
    </motion.svg>
  );
}
