"use client";

import { motion } from "framer-motion";

interface KeyValueCardProps {
  keyValue: { key: string; value: string; unit?: string };
  index: number;
}

export function KeyValueCard({ keyValue, index }: KeyValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="bg-[#2D2D2D] border border-gray-800 rounded-lg p-4 hover:border-orange-500/50 transition-all"
    >
      <div className="text-xs font-medium text-gray-500 mb-2">{keyValue.key}</div>
      <div className="text-xl font-bold text-white">
        {keyValue.value}
        {keyValue.unit && <span className="text-sm font-semibold text-gray-400 ml-1">{keyValue.unit}</span>}
      </div>
    </motion.div>
  );
}
