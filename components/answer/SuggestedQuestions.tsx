"use client";

import { motion } from "framer-motion";
import { 
  Code, Wrench, Sparkles, GitCompare, AlertCircle, Layers, 
  Cpu, TrendingUp, Edit3, Package, AlertTriangle 
} from "lucide-react";
import realSuggestions from "@/data/realSuggestions.json";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const categoryIcons: { [key: string]: any } = {
  "Critical Issues": AlertCircle,
  "Test Results": TrendingUp,
  "Design Solutions": Edit3,
  "Test Setup": Code,
  "Materials": Layers,
  "BMCM Results": Cpu,
  "Assembly Details": Package,
  "Next Steps": GitCompare,
  "Quick Facts": Sparkles,
  "Detailed Analysis": AlertTriangle,
};

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  // Flatten questions from all categories and take first 4
  const allQuestions = realSuggestions.categories.flatMap((category) =>
    category.questions.map((q) => ({
      question: q,
      categoryName: category.name,
    }))
  ).slice(0, 4);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allQuestions.map((item, idx) => {
          const Icon = categoryIcons[item.categoryName] || Sparkles;
          
          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(item.question)}
              className="group text-left p-5 bg-[#1A1A1A] border border-gray-800 rounded-xl hover:border-orange-500/50 hover:bg-[#2D2D2D] transition-all"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-[#2D2D2D] group-hover:bg-orange-500/10 transition-colors">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" strokeWidth={2} />
                </div>
                <p className="flex-1 text-sm text-gray-300 leading-relaxed font-medium group-hover:text-white transition-colors">
                  {item.question}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
