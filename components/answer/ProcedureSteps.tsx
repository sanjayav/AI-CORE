"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface ProcedureStepsProps {
  steps: string[];
}

export function ProcedureSteps({ steps }: ProcedureStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <div className="space-y-2">
      {steps.map((step, idx) => {
        const isCompleted = completedSteps.has(idx);
        return (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 2 }}
            onClick={() => toggleStep(idx)}
            className={`w-full flex items-start space-x-3 p-3 rounded-lg border transition-all text-left ${
              isCompleted
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-[#2D2D2D] border-gray-800 hover:border-orange-500/50'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-semibold text-gray-500">Step {idx + 1}</span>
              </div>
              <p className={`text-sm leading-relaxed ${
                isCompleted ? 'text-gray-500 line-through' : 'text-gray-300'
              }`}>
                {step}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
