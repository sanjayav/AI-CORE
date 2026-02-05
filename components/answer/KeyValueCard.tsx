"use client";

import { motion } from "framer-motion";

interface KeyValueCardProps {
  keyValue: { label: string; value: string; unit?: string };
  index: number;
}

export function KeyValueCard({ keyValue, index }: KeyValueCardProps) {
  // Parse value to check for status indicators
  const hasCheckmark = keyValue.value.includes('✓');
  const hasCross = keyValue.value.includes('❌');
  const hasWarning = keyValue.value.includes('↑') || keyValue.value.includes('↓');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`
        bg-gradient-to-br from-[#2D2D2D] to-[#252525] 
        border-2 rounded-xl p-4 
        transition-all duration-200
        ${hasCross 
          ? 'border-red-500/30 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/10' 
          : hasWarning
          ? 'border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/10'
          : hasCheckmark
          ? 'border-green-500/30 hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/10'
          : 'border-gray-700 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-tight">
          {keyValue.label}
        </div>
        {hasCross && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
            <span className="text-red-400 text-xs">✗</span>
          </div>
        )}
        {hasCheckmark && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <span className="text-green-400 text-xs">✓</span>
          </div>
        )}
      </div>
      <div className={`
        text-base font-bold leading-tight
        ${hasCross ? 'text-red-300' : hasCheckmark ? 'text-green-300' : hasWarning ? 'text-yellow-300' : 'text-white'}
      `}>
        {keyValue.value}
        {keyValue.unit && <span className="text-sm font-semibold text-gray-400 ml-1">{keyValue.unit}</span>}
      </div>
    </motion.div>
  );
}
