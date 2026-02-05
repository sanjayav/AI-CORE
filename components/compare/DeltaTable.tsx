"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Plus, Minus, Edit3 } from "lucide-react";

interface Delta {
  field: string;
  type: "added" | "modified" | "removed";
  value_before?: string;
  value_after?: string;
  section: string;
}

interface DeltaTableProps {
  deltas: Delta[];
}

export function DeltaTable({ deltas }: DeltaTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "added":
        return {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          text: "text-green-400",
          icon: Plus,
          iconColor: "text-green-400",
        };
      case "modified":
        return {
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
          text: "text-orange-400",
          icon: Edit3,
          iconColor: "text-orange-400",
        };
      case "removed":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          text: "text-red-400",
          icon: Minus,
          iconColor: "text-red-400",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
          text: "text-gray-400",
          icon: Edit3,
          iconColor: "text-gray-400",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1A1A1A] rounded-xl border border-gray-800 overflow-hidden"
    >
      <div className="divide-y divide-gray-800">
        {deltas.map((delta, idx) => {
          const isExpanded = expandedRows.has(idx);
          const styles = getTypeStyles(delta.type);
          const Icon = styles.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="hover:bg-[#2D2D2D] transition-colors"
            >
              {/* Row Header */}
              <button
                onClick={() => toggleRow(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </motion.div>

                  <div className={`w-8 h-8 rounded-lg ${styles.bg} border ${styles.border} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-white">{delta.field}</div>
                    <div className="text-sm text-gray-400">{delta.section}</div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${styles.bg} ${styles.text} border ${styles.border}`}>
                    {delta.type}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 ml-14">
                      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-gray-800">
                        {delta.type === "modified" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs font-bold text-gray-400 mb-2">Before</div>
                              <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-sm text-red-300 font-mono">
                                {delta.value_before || "N/A"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-400 mb-2">After</div>
                              <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-sm text-green-300 font-mono">
                                {delta.value_after || "N/A"}
                              </div>
                            </div>
                          </div>
                        )}
                        {delta.type === "added" && (
                          <div>
                            <div className="text-xs font-bold text-gray-400 mb-2">New Value</div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-sm text-green-300 font-mono">
                              {delta.value_after || "N/A"}
                            </div>
                          </div>
                        )}
                        {delta.type === "removed" && (
                          <div>
                            <div className="text-xs font-bold text-gray-400 mb-2">Removed Value</div>
                            <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-sm text-red-300 font-mono line-through">
                              {delta.value_before || "N/A"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
