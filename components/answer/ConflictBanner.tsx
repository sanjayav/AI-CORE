"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { useStore } from "@/lib/store";

interface ConflictBannerProps {
  conflicts: any[];
}

export function ConflictBanner({ conflicts }: ConflictBannerProps) {
  const { setSelectedCitation, setEvidenceViewerOpen } = useStore();

  const openEvidence = (sourceData: any) => {
    setSelectedCitation({
      docId: sourceData.docId,
      page: sourceData.page,
      section: sourceData.section || "",
      snippet: sourceData.value,
    });
    setEvidenceViewerOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border-2 border-red-200 rounded-xl p-6"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Conflict Detected
          </h3>
          {conflicts.map((conflict, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <p className="text-red-800 mb-3">{conflict.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Source A */}
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="text-xs font-medium text-red-700 mb-2">
                    Source A: {conflict.sourceA.docId}
                  </div>
                  <div className="text-sm text-gray-900 font-mono mb-2">
                    {conflict.sourceA.value}
                  </div>
                  <button
                    onClick={() => openEvidence(conflict.sourceA)}
                    className="text-xs text-accent hover:text-accent-dark flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View evidence (p. {conflict.sourceA.page})</span>
                  </button>
                </div>

                {/* Source B */}
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="text-xs font-medium text-red-700 mb-2">
                    Source B: {conflict.sourceB.docId}
                  </div>
                  <div className="text-sm text-gray-900 font-mono mb-2">
                    {conflict.sourceB.value}
                  </div>
                  <button
                    onClick={() => openEvidence(conflict.sourceB)}
                    className="text-xs text-accent hover:text-accent-dark flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View evidence (p. {conflict.sourceB.page})</span>
                  </button>
                </div>
              </div>

              {conflict.recommendation && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Recommendation:</strong> {conflict.recommendation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
