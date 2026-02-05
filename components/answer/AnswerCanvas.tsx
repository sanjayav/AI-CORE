"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, TrendingUp, FileText } from "lucide-react";
import { CitationChip } from "./CitationChip";
import { KeyValueCard } from "./KeyValueCard";
import { ProcedureSteps } from "./ProcedureSteps";
import { ConflictBanner } from "./ConflictBanner";

interface AnswerCanvasProps {
  answer: any;
  isStreaming?: boolean;
}

export function AnswerCanvas({ answer, isStreaming = false }: AnswerCanvasProps) {
  const hasConflicts = answer.conflicts && answer.conflicts.length > 0;
  const [streamedText, setStreamedText] = useState("");
  const fullText = answer.summary;

  useEffect(() => {
    if (isStreaming) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setStreamedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    } else {
      setStreamedText(fullText);
    }
  }, [isStreaming, fullText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5 bg-[#1A1A1A] rounded-2xl rounded-tl-sm p-6 border border-gray-800"
    >
      {/* Conflict Banner */}
      <AnimatePresence>
        {hasConflicts && <ConflictBanner conflicts={answer.conflicts} />}
      </AnimatePresence>

      {/* Main Answer */}
      <div className="space-y-5">
        {/* Summary */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
              answer.confidence > 0.9
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : answer.confidence > 0.8
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
            }`}>
              {Math.round(answer.confidence * 100)}% confident
            </div>
          </div>
          <p className="text-[15px] text-gray-300 leading-relaxed">
            {streamedText}
          </p>
        </div>

        {/* Citations */}
        {answer.citations && answer.citations.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-400">Sources</h4>
              <span className="text-xs text-gray-600">({answer.citations.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {answer.citations.map((citation: any, idx: number) => (
                <CitationChip key={idx} citation={citation} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Key Values */}
        {answer.key_values && answer.key_values.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-400">Key Specifications</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {answer.key_values.map((kv: any, idx: number) => (
                <KeyValueCard key={idx} keyValue={kv} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Procedure Steps */}
        {answer.procedure && answer.procedure.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-400">Procedure</h4>
            </div>
            <ProcedureSteps steps={answer.procedure} />
          </div>
        )}

        {/* Assumptions */}
        {answer.assumptions && answer.assumptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4"
          >
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Assumptions</h4>
                <ul className="text-sm text-gray-400 space-y-1.5">
                  {answer.assumptions.map((assumption: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{assumption}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
