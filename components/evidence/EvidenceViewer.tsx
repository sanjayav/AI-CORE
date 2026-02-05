"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { X, FileText, Download, ExternalLink, ChevronRight, Maximize2 } from "lucide-react";

export function EvidenceViewer() {
  const { evidenceViewerOpen, setEvidenceViewerOpen, selectedCitation } = useStore();

  if (!evidenceViewerOpen || !selectedCitation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-8"
        onClick={() => setEvidenceViewerOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Professional Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B1B3D] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Source Document</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-medium">{selectedCitation.doc_title}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>Page {selectedCitation.page}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEvidenceViewerOpen(false)}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Professional Content */}
          <div className="flex h-[calc(90vh-100px)]">
            {/* Left: Extracted Passages */}
            <div className="w-96 bg-gray-50 border-r border-gray-200 overflow-y-auto p-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Extracted Evidence</h3>
                <p className="text-xs text-gray-600">Relevant passages from this document</p>
              </div>

              <div className="space-y-4">
                {selectedCitation.passages?.map((passage: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#0B1B3D] hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="px-2 py-0.5 rounded bg-[#0B1B3D] text-white text-xs font-semibold">
                        {idx + 1}
                      </div>
                      <span className="text-xs text-gray-500">Line {(idx + 1) * 15}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{passage}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: PDF Preview */}
            <div className="flex-1 bg-gray-100 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full mx-8">
                  <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center relative overflow-hidden">
                    {/* PDF Page Mockup */}
                    <div className="absolute inset-8 bg-white rounded shadow-inner p-6">
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 mt-6"></div>
                        <div className="h-3 bg-yellow-200 rounded w-full border-l-4 border-yellow-500 pl-2"></div>
                        <div className="h-3 bg-yellow-200 rounded w-4/5 border-l-4 border-yellow-500 pl-2"></div>
                        <div className="h-4 mt-6"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>

                    {/* Page Info Overlay */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/80 text-white text-xs font-medium rounded-lg">
                      Page {selectedCitation.page} of 247
                    </div>

                    {/* Zoom Control */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-black/80 hover:bg-black text-white rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Document Info */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{selectedCitation.doc_id}</span>
                    <span>Confidence: {Math.round(selectedCitation.score * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
