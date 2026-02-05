"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useStore } from "@/lib/store";

interface CitationChipProps {
  citation: any;
  index: number;
}

export function CitationChip({ citation, index }: CitationChipProps) {
  const { setEvidenceViewerOpen, setSelectedCitation } = useStore();

  const handleClick = () => {
    setSelectedCitation(citation);
    setEvidenceViewerOpen(true);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="inline-flex items-center space-x-2 px-3 py-2 bg-[#2D2D2D] border border-gray-700 hover:border-orange-500 rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-all"
    >
      <FileText className="w-3.5 h-3.5" />
      <span className="font-semibold">[{index + 1}]</span>
      <span className="max-w-[180px] truncate">{citation.doc_title}</span>
    </motion.button>
  );
}
