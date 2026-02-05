"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-3 px-5 py-4 bg-[#1A1A1A] border border-gray-800 rounded-2xl rounded-tl-sm w-fit">
      <div className="flex items-center space-x-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-orange-500"
          />
        ))}
      </div>
      <span className="text-sm text-gray-400">Analyzing documents...</span>
    </div>
  );
}
