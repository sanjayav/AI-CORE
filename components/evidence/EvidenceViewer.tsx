"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { X, FileText, Download, ExternalLink, ChevronRight, Maximize2, User, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import realPresentations from "@/data/realPresentations.json";
import powerpointSlides1 from "@/data/powerpoint_slides (1).json";
import powerpointSlides from "@/data/powerpoint_slides.json";
import aJson from "@/data/a.json";

export function EvidenceViewer() {
  const { evidenceViewerOpen, setEvidenceViewerOpen, selectedCitation } = useStore();
  const [documentData, setDocumentData] = useState<any>(null);
  const [slideContent, setSlideContent] = useState<any>(null);

  useEffect(() => {
    if (selectedCitation && selectedCitation.docId) {
      // Find the document metadata
      const docMeta = realPresentations.documents.find(
        (doc) => doc.id === selectedCitation.docId
      );

      if (docMeta) {
        // Load the appropriate PowerPoint JSON file
        let pptData;
        if (docMeta.file === "powerpoint_slides (1).json") {
          pptData = powerpointSlides1;
        } else if (docMeta.file === "powerpoint_slides.json") {
          pptData = powerpointSlides;
        } else if (docMeta.file === "a.json") {
          pptData = aJson;
        }

        setDocumentData({ ...docMeta, ...pptData });

        // Find the specific slide if page number is provided
        if (pptData && selectedCitation.page) {
          const slide = pptData.slides.find(
            (s: any) => s.slide_number === selectedCitation.page
          );
          setSlideContent(slide);
        }
      }
    }
  }, [selectedCitation]);

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
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {documentData?.name || selectedCitation.docId}
                  </h2>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    {documentData?.author && (
                      <>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{documentData.author}</span>
                        </div>
                        <span>•</span>
                      </>
                    )}
                    {documentData?.date && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{documentData.date}</span>
                        </div>
                        <span>•</span>
                      </>
                    )}
                    <span className="font-medium">Slide {selectedCitation.page}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-orange-600 font-medium">{selectedCitation.section}</span>
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
            {/* Left: Extracted Excerpt */}
            <div className="w-96 bg-gray-50 border-r border-gray-200 overflow-y-auto p-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Extracted Evidence</h3>
                <p className="text-xs text-gray-600">Relevant excerpt from slide {selectedCitation.page}</p>
              </div>

              <div className="space-y-4">
                {selectedCitation.excerpt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg border border-orange-200 p-4 hover:border-orange-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="px-2 py-0.5 rounded bg-orange-500 text-white text-xs font-semibold">
                        Section: {selectedCitation.section}
                      </div>
                      <div className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-700 text-xs font-semibold">
                        {Math.round(selectedCitation.confidence * 100)}% confidence
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedCitation.excerpt}</p>
                  </motion.div>
                )}

                {/* Document Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-xs font-semibold text-blue-900 mb-2">Document Information</h4>
                  <div className="space-y-1.5 text-xs text-blue-700">
                    <div><span className="font-medium">ID:</span> {selectedCitation.docId}</div>
                    <div><span className="font-medium">Page:</span> {selectedCitation.page}</div>
                    {documentData?.total_slides && (
                      <div><span className="font-medium">Total Slides:</span> {documentData.total_slides}</div>
                    )}
                    {documentData?.type && (
                      <div><span className="font-medium">Type:</span> {documentData.type}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Slide Content */}
            <div className="flex-1 bg-gray-100 overflow-y-auto p-8">
              <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
                {slideContent ? (
                  <div className="space-y-6">
                    {/* Slide Header */}
                    <div className="border-b-2 border-orange-500 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          Slide {slideContent.slide_number}
                        </h3>
                        <div className="px-3 py-1 bg-orange-100 border border-orange-300 rounded-lg">
                          <span className="text-sm font-semibold text-orange-700">
                            {documentData?.type || "Analysis"}
                          </span>
                        </div>
                      </div>
                      {documentData?.presentation_info?.author && (
                        <p className="text-sm text-gray-600">
                          {documentData.presentation_info.author}
                        </p>
                      )}
                    </div>

                    {/* Slide Content */}
                    <div className="space-y-4">
                      {slideContent.text_blocks.map((block: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`
                            ${block.type === "Title" ? "text-2xl font-black text-gray-900 mb-4" : ""}
                            ${block.type === "Header" ? "text-lg font-bold text-gray-800 mt-4" : ""}
                            ${block.type === "Text" ? "text-base text-gray-700 leading-relaxed" : ""}
                            ${block.type === "Table" ? "p-4 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-x-auto" : ""}
                          `}
                        >
                          {block.type === "Table" ? (
                            <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800">
                              {block.text}
                            </pre>
                          ) : (
                            <div className="whitespace-pre-wrap">{block.text}</div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Slide Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Slide {slideContent.slide_number} of {documentData?.total_slides || "?"}
                      </span>
                      <span>
                        {slideContent.text_blocks.length} content blocks
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Loading slide content...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
