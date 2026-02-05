"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitCompare, FileText, Search, Filter, Download, TrendingUp, TrendingDown,
  Plus, Minus, Edit3, ChevronDown, ChevronRight, Eye, EyeOff, BarChart3,
  Split, Layout, Code2, AlertCircle, Clock, Layers, ArrowRight, Maximize2,
  FileCode, CheckCircle2, XCircle, Info, Sparkles, Copy, RefreshCw
} from "lucide-react";
import mockComparison from "@/data/mockComparison.json";
import mockLibrary from "@/data/mockLibrary.json";

interface Delta {
  field: string;
  type: "added" | "modified" | "removed";
  value_before?: string;
  value_after?: string;
  section: string;
}

interface Document {
  id: string;
  name: string;
  program: string;
  modelYear: string;
  subsystem: string;
  docType: string;
  version: string;
  pages: number;
  accessLevel: string;
}

type ViewMode = "split" | "unified" | "timeline";
type FilterType = "all" | "added" | "modified" | "removed";

export function CompareMode() {
  const [selectedDocA, setSelectedDocA] = useState<string | null>(null);
  const [selectedDocB, setSelectedDocB] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedChanges, setExpandedChanges] = useState<Set<number>>(new Set([0, 1, 2]));
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(true);
  const [docADropdownOpen, setDocADropdownOpen] = useState(false);
  const [docBDropdownOpen, setDocBDropdownOpen] = useState(false);

  // Get documents from library
  const availableDocuments = mockLibrary.documents;

  // Get selected document objects
  const docA = availableDocuments.find(d => d.id === selectedDocA);
  const docB = availableDocuments.find(d => d.id === selectedDocB);

  const allDeltas: Delta[] = mockComparison.deltas as Delta[];

  // Filter deltas
  const filteredDeltas = allDeltas.filter(delta => {
    const matchesFilter = filterType === "all" || delta.type === filterType;
    const matchesSearch = searchQuery === "" ||
      delta.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delta.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (delta.value_before && delta.value_before.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (delta.value_after && delta.value_after.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    total: allDeltas.length,
    added: allDeltas.filter(d => d.type === "added").length,
    modified: allDeltas.filter(d => d.type === "modified").length,
    removed: allDeltas.filter(d => d.type === "removed").length,
    similarity: mockComparison.similarityScore,
  };

  const handleCompare = () => {
    if (selectedDocA && selectedDocB && selectedDocA !== selectedDocB) {
      setShowComparison(true);
    }
  };

  const handleReset = () => {
    setShowComparison(false);
    setSelectedDocA(null);
    setSelectedDocB(null);
  };

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedChanges);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedChanges(newExpanded);
  };

  const expandAll = () => {
    setExpandedChanges(new Set(filteredDeltas.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedChanges(new Set());
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "added":
        return {
          icon: Plus,
          color: "green",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          text: "text-green-400",
          gradient: "from-green-500 to-green-600",
        };
      case "modified":
        return {
          icon: Edit3,
          color: "orange",
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
          text: "text-orange-400",
          gradient: "from-orange-500 to-orange-600",
        };
      case "removed":
        return {
          icon: Minus,
          color: "red",
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          text: "text-red-400",
          gradient: "from-red-500 to-red-600",
        };
      default:
        return {
          icon: Edit3,
          color: "gray",
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
          text: "text-gray-400",
          gradient: "from-gray-500 to-gray-600",
        };
    }
  };

  // Document Selection Screen
  if (!showComparison) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <div className="min-h-screen bg-[#0A0A0A] pt-4 pb-16">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40"
                >
                  <GitCompare className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tight mb-3">Document Comparison</h1>
              <p className="text-lg text-gray-400">Select two documents to compare and analyze their differences</p>
            </motion.div>

            {/* Document Selection Cards */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Document A Selector */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-red-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-xl">
                      <span className="text-sm font-black text-red-400 uppercase">Base Document</span>
                    </div>
                    <FileText className="w-8 h-8 text-red-400" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-6">Select Document A</h3>

                  {/* Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setDocADropdownOpen(!docADropdownOpen);
                        setDocBDropdownOpen(false);
                      }}
                      className={`
                        w-full px-6 py-4 rounded-xl flex items-center justify-between gap-4 transition-all
                        ${selectedDocA 
                          ? "bg-red-500/20 border-2 border-red-500/50 text-white" 
                          : "bg-[#2D2D2D] border-2 border-gray-700 text-gray-400 hover:border-red-500/50"
                        }
                      `}
                    >
                      <span className="font-bold text-left flex-1 truncate">
                        {selectedDocA 
                          ? availableDocuments.find(d => d.id === selectedDocA)?.name
                          : "Choose a document..."
                        }
                      </span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${docADropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {docADropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border-2 border-red-500/30 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50"
                        >
                          {availableDocuments.map((doc, idx) => (
                            <motion.button
                              key={doc.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              onClick={() => {
                                setSelectedDocA(doc.id);
                                setDocADropdownOpen(false);
                              }}
                              disabled={doc.id === selectedDocB}
                              className={`
                                w-full px-6 py-4 text-left transition-all border-b border-gray-800 last:border-0
                                ${doc.id === selectedDocA 
                                  ? "bg-red-500/20 text-white"
                                  : doc.id === selectedDocB
                                    ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                                    : "hover:bg-red-500/10 text-gray-300"
                                }
                              `}
                            >
                              <div className="font-bold text-sm mb-1">{doc.name}</div>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>Year: {doc.modelYear}</span>
                                <span>•</span>
                                <span>v{doc.version}</span>
                                <span>•</span>
                                <span>{doc.pages} pages</span>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Selected Document Info */}
                  {docA && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 pt-6 border-t border-red-500/20"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Program</div>
                          <div className="text-white font-bold">{docA.program}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Model Year</div>
                          <div className="text-white font-bold">{docA.modelYear}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Subsystem</div>
                          <div className="text-white font-bold">{docA.subsystem}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Version</div>
                          <div className="text-white font-bold">{docA.version}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Document B Selector */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-green-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-xl">
                      <span className="text-sm font-black text-green-400 uppercase">Comparison Document</span>
                    </div>
                    <FileText className="w-8 h-8 text-green-400" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-6">Select Document B</h3>

                  {/* Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setDocBDropdownOpen(!docBDropdownOpen);
                        setDocADropdownOpen(false);
                      }}
                      className={`
                        w-full px-6 py-4 rounded-xl flex items-center justify-between gap-4 transition-all
                        ${selectedDocB 
                          ? "bg-green-500/20 border-2 border-green-500/50 text-white" 
                          : "bg-[#2D2D2D] border-2 border-gray-700 text-gray-400 hover:border-green-500/50"
                        }
                      `}
                    >
                      <span className="font-bold text-left flex-1 truncate">
                        {selectedDocB 
                          ? availableDocuments.find(d => d.id === selectedDocB)?.name
                          : "Choose a document..."
                        }
                      </span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${docBDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {docBDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border-2 border-green-500/30 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50"
                        >
                          {availableDocuments.map((doc, idx) => (
                            <motion.button
                              key={doc.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              onClick={() => {
                                setSelectedDocB(doc.id);
                                setDocBDropdownOpen(false);
                              }}
                              disabled={doc.id === selectedDocA}
                              className={`
                                w-full px-6 py-4 text-left transition-all border-b border-gray-800 last:border-0
                                ${doc.id === selectedDocB 
                                  ? "bg-green-500/20 text-white"
                                  : doc.id === selectedDocA
                                    ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                                    : "hover:bg-green-500/10 text-gray-300"
                                }
                              `}
                            >
                              <div className="font-bold text-sm mb-1">{doc.name}</div>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>Year: {doc.modelYear}</span>
                                <span>•</span>
                                <span>v{doc.version}</span>
                                <span>•</span>
                                <span>{doc.pages} pages</span>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Selected Document Info */}
                  {docB && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 pt-6 border-t border-green-500/20"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Program</div>
                          <div className="text-white font-bold">{docB.program}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Model Year</div>
                          <div className="text-white font-bold">{docB.modelYear}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Subsystem</div>
                          <div className="text-white font-bold">{docB.subsystem}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Version</div>
                          <div className="text-white font-bold">{docB.version}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Compare Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: selectedDocA && selectedDocB && selectedDocA !== selectedDocB ? 1.05 : 1 }}
                whileTap={{ scale: selectedDocA && selectedDocB && selectedDocA !== selectedDocB ? 0.95 : 1 }}
                onClick={handleCompare}
                disabled={!selectedDocA || !selectedDocB || selectedDocA === selectedDocB}
                className={`
                  px-12 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl flex items-center gap-3 mx-auto
                  ${selectedDocA && selectedDocB && selectedDocA !== selectedDocB
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/50 cursor-pointer"
                    : "bg-gray-800 text-gray-600 cursor-not-allowed"
                  }
                `}
              >
                <GitCompare className="w-6 h-6" />
                <span>Compare Documents</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              {selectedDocA === selectedDocB && selectedDocA && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-red-400 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Please select two different documents to compare
                </motion.p>
              )}
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">How to Compare</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Select a base document (Document A) from the left dropdown</li>
                    <li>• Select a comparison document (Document B) from the right dropdown</li>
                    <li>• Documents must be different to enable comparison</li>
                    <li>• Click "Compare Documents" to view detailed delta analysis</li>
                    <li>• You can compare any documents across different years, versions, or programs</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Comparison Results Screen (existing code continues...)
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="min-h-screen bg-[#0A0A0A] pt-4 pb-16">
        <div className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Header with Reset Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40">
                  <GitCompare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white tracking-tight">Comparison Results</h1>
                  <p className="text-base text-gray-400 mt-1">Advanced delta analysis and version control</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-[#1A1A1A] border border-gray-800 text-gray-300 rounded-xl flex items-center gap-2 hover:border-orange-500/50 transition-all text-sm font-bold"
                >
                  <RefreshCw className="w-4 h-4" />
                  Change Documents
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-[#1A1A1A] border border-gray-800 text-gray-300 rounded-xl flex items-center gap-2 hover:border-orange-500/50 transition-all text-sm font-bold"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all text-sm font-bold"
                >
                  <Copy className="w-4 h-4" />
                  Copy Summary
                </motion.button>
              </div>
            </div>

            {/* Document Comparison Header */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Document A */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-red-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-lg">
                      <span className="text-xs font-black text-red-400 uppercase">Base Version</span>
                    </div>
                    <FileText className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{docA?.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-400">Year:</span>
                      <span className="font-bold text-white">{docA?.modelYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-400">Version:</span>
                      <span className="font-bold text-white">{docA?.version}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-400">Pages:</span>
                      <span className="font-bold text-white">{docA?.pages}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-400">Subsystem:</span>
                      <span className="font-bold text-white">{docA?.subsystem}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Document ID: {docA?.id}</div>
                </div>
              </motion.div>

              {/* Document B */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-green-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-lg">
                      <span className="text-xs font-black text-green-400 uppercase">New Version</span>
                    </div>
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{docB?.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-400">Year:</span>
                      <span className="font-bold text-white">{docB?.modelYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-400">Version:</span>
                      <span className="font-bold text-white">{docB?.version}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-400">Pages:</span>
                      <span className="font-bold text-white">{docB?.pages}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-400">Subsystem:</span>
                      <span className="font-bold text-white">{docB?.subsystem}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Document ID: {docB?.id}</div>
                </div>
              </motion.div>
            </div>

            {/* Comparison Arrow */}
            <div className="flex items-center justify-center -my-3 relative z-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="bg-[#0A0A0A] border-2 border-orange-500 rounded-full p-3 shadow-2xl shadow-orange-500/50"
              >
                <ArrowRight className="w-6 h-6 text-orange-400" />
              </motion.div>
            </div>

            {/* Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-5 gap-4 mt-6"
            >
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 hover:border-orange-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Layers className="w-5 h-5 text-orange-400" />
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-3xl font-black text-orange-400 mb-1">{stats.total}</div>
                <div className="text-xs text-gray-400 font-medium">Total Changes</div>
              </div>

              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 hover:border-green-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Plus className="w-5 h-5 text-green-400" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-3xl font-black text-green-400 mb-1">{stats.added}</div>
                <div className="text-xs text-gray-400 font-medium">Added Fields</div>
              </div>

              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 hover:border-orange-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Edit3 className="w-5 h-5 text-orange-400" />
                  <BarChart3 className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-3xl font-black text-orange-400 mb-1">{stats.modified}</div>
                <div className="text-xs text-gray-400 font-medium">Modified</div>
              </div>

              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 hover:border-red-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Minus className="w-5 h-5 text-red-400" />
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-3xl font-black text-red-400 mb-1">{stats.removed}</div>
                <div className="text-xs text-gray-400 font-medium">Removed</div>
              </div>

              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-3xl font-black text-blue-400 mb-1">{stats.similarity}%</div>
                <div className="text-xs text-gray-400 font-medium">Similarity</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-5 mb-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Search */}
              <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fields, sections, or values..."
                  className="w-full pl-11 pr-4 py-3 bg-[#2D2D2D] border border-gray-700 text-white placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                {[
                  { id: "all", label: "All", icon: Filter, count: stats.total },
                  { id: "added", label: "Added", icon: Plus, count: stats.added },
                  { id: "modified", label: "Modified", icon: Edit3, count: stats.modified },
                  { id: "removed", label: "Removed", icon: Minus, count: stats.removed },
                ].map((filter) => {
                  const Icon = filter.icon;
                  const config = getTypeConfig(filter.id === "all" ? "modified" : filter.id);
                  return (
                    <motion.button
                      key={filter.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterType(filter.id as FilterType)}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2
                        ${filterType === filter.id
                          ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg shadow-${config.color}-500/30`
                          : "bg-[#2D2D2D] border border-gray-700 text-gray-300 hover:border-gray-600"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{filter.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                        filterType === filter.id ? "bg-white/20" : "bg-gray-800"
                      }`}>
                        {filter.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-2">
                {[
                  { id: "split", icon: Split, label: "Split" },
                  { id: "unified", icon: Layout, label: "Unified" },
                  { id: "timeline", icon: Clock, label: "Timeline" },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <motion.button
                      key={mode.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode(mode.id as ViewMode)}
                      className={`
                        p-2.5 rounded-xl transition-all
                        ${viewMode === mode.id
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                          : "bg-[#2D2D2D] text-gray-400 hover:text-white hover:bg-[#3D3D3D]"
                        }
                      `}
                      title={mode.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {showOnlyDifferences ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span className="font-medium">{showOnlyDifferences ? "Showing" : "Hiding"} differences only</span>
                </button>
                <div className="h-4 w-px bg-gray-800"></div>
                <span className="text-sm text-gray-500">
                  {filteredDeltas.length} of {stats.total} changes • {expandedChanges.size} expanded
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={expandAll}
                  className="px-3 py-1.5 bg-[#2D2D2D] border border-gray-700 text-gray-300 rounded-lg text-xs font-bold hover:border-orange-500/50 transition-all"
                >
                  Expand All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={collapseAll}
                  className="px-3 py-1.5 bg-[#2D2D2D] border border-gray-700 text-gray-300 rounded-lg text-xs font-bold hover:border-orange-500/50 transition-all"
                >
                  Collapse All
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Changes List - Split View */}
          <AnimatePresence mode="wait">
            {viewMode === "split" && (
              <motion.div
                key="split"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {filteredDeltas.length === 0 ? (
                  <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-16 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">No changes found</h3>
                    <p className="text-sm text-gray-600">Try adjusting your filters or search query</p>
                  </div>
                ) : (
                  filteredDeltas.map((delta, idx) => {
                    const config = getTypeConfig(delta.type);
                    const Icon = config.icon;
                    const isExpanded = expandedChanges.has(idx);

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="bg-[#1A1A1A] border-2 border-gray-800 hover:border-gray-700 rounded-2xl overflow-hidden shadow-lg transition-all"
                      >
                        {/* Change Header */}
                        <button
                          onClick={() => toggleExpand(idx)}
                          className="w-full p-6 flex items-center gap-4 hover:bg-[#2D2D2D]/50 transition-colors text-left"
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          </motion.div>

                          <div className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${config.text}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-black text-white truncate">{delta.field}</h3>
                              <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${config.bg} ${config.text} border ${config.border}`}>
                                {delta.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Code2 className="w-4 h-4" />
                              <span className="font-medium">{delta.section}</span>
                            </div>
                          </div>

                          {!isExpanded && delta.type === "modified" && (
                            <div className="hidden xl:flex items-center gap-4 text-sm flex-shrink-0">
                              <div className="text-right max-w-xs">
                                <div className="text-xs text-gray-500 mb-1">Before</div>
                                <div className="text-gray-400 truncate font-mono text-xs">{delta.value_before}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-600" />
                              <div className="text-left max-w-xs">
                                <div className="text-xs text-gray-500 mb-1">After</div>
                                <div className="text-white truncate font-mono text-xs">{delta.value_after}</div>
                              </div>
                            </div>
                          )}
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 border-t border-gray-800">
                                {delta.type === "modified" && (
                                  <div className="grid grid-cols-2 gap-6 mt-6">
                                    <div className="bg-gradient-to-br from-red-500/5 to-transparent border-2 border-red-500/20 rounded-xl p-5">
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                          <XCircle className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-black text-red-400 uppercase">Before</div>
                                          <div className="text-xs text-gray-500">{docA?.modelYear} • v{docA?.version}</div>
                                        </div>
                                      </div>
                                      <div className="bg-[#0A0A0A] border border-red-500/20 rounded-lg p-4">
                                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                                          {delta.value_before || "N/A"}
                                        </pre>
                                      </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-500/5 to-transparent border-2 border-green-500/20 rounded-xl p-5">
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-black text-green-400 uppercase">After</div>
                                          <div className="text-xs text-gray-500">{docB?.modelYear} • v{docB?.version}</div>
                                        </div>
                                      </div>
                                      <div className="bg-[#0A0A0A] border border-green-500/20 rounded-lg p-4">
                                        <pre className="text-sm text-white font-mono whitespace-pre-wrap leading-relaxed">
                                          {delta.value_after || "N/A"}
                                        </pre>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {delta.type === "added" && (
                                  <div className="mt-6">
                                    <div className="bg-gradient-to-br from-green-500/5 to-transparent border-2 border-green-500/20 rounded-xl p-5">
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                          <Plus className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-black text-green-400 uppercase">New Field Added</div>
                                          <div className="text-xs text-gray-500">Introduced in {docB?.modelYear} • v{docB?.version}</div>
                                        </div>
                                      </div>
                                      <div className="bg-[#0A0A0A] border border-green-500/20 rounded-lg p-4">
                                        <pre className="text-sm text-white font-mono whitespace-pre-wrap leading-relaxed">
                                          {delta.value_after || "N/A"}
                                        </pre>
                                      </div>
                                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                        <Info className="w-4 h-4" />
                                        <span>This field did not exist in the previous version</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {delta.type === "removed" && (
                                  <div className="mt-6">
                                    <div className="bg-gradient-to-br from-red-500/5 to-transparent border-2 border-red-500/20 rounded-xl p-5">
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                          <Minus className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-black text-red-400 uppercase">Field Removed</div>
                                          <div className="text-xs text-gray-500">Removed in {docB?.modelYear} • v{docB?.version}</div>
                                        </div>
                                      </div>
                                      <div className="bg-[#0A0A0A] border border-red-500/20 rounded-lg p-4">
                                        <pre className="text-sm text-gray-400 font-mono whitespace-pre-wrap leading-relaxed line-through">
                                          {delta.value_before || "N/A"}
                                        </pre>
                                      </div>
                                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>This field has been deprecated in the new version</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}

            {/* Unified View */}
            {viewMode === "unified" && (
              <motion.div
                key="unified"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b-2 border-orange-500/20 p-5">
                  <div className="flex items-center gap-3">
                    <FileCode className="w-6 h-6 text-orange-400" />
                    <div>
                      <h3 className="text-lg font-black text-white">Unified Diff View</h3>
                      <p className="text-xs text-gray-400">Side-by-side comparison</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  {filteredDeltas.map((delta, idx) => {
                    const config = getTypeConfig(delta.type);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        className={`p-4 rounded-lg border-l-4 ${config.border} ${config.bg} hover:bg-opacity-20 transition-all`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-sm font-black ${config.text}`}>{delta.field}</span>
                              <span className="text-xs text-gray-500">• {delta.section}</span>
                            </div>
                            {delta.type === "modified" && (
                              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                <div>
                                  <span className="text-red-400">- </span>
                                  <span className="text-gray-500 line-through">{delta.value_before}</span>
                                </div>
                                <div>
                                  <span className="text-green-400">+ </span>
                                  <span className="text-white">{delta.value_after}</span>
                                </div>
                              </div>
                            )}
                            {delta.type === "added" && (
                              <div className="text-xs font-mono">
                                <span className="text-green-400">+ </span>
                                <span className="text-white">{delta.value_after}</span>
                              </div>
                            )}
                            {delta.type === "removed" && (
                              <div className="text-xs font-mono">
                                <span className="text-red-400">- </span>
                                <span className="text-gray-500 line-through">{delta.value_before}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Timeline View */}
            {viewMode === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-green-500"></div>

                {filteredDeltas.map((delta, idx) => {
                  const config = getTypeConfig(delta.type);
                  const Icon = config.icon;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative pl-32 pr-6 pb-8 group"
                    >
                      <div className={`absolute left-12 top-6 w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient} border-4 border-[#0A0A0A] shadow-xl flex items-center justify-center z-10`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all shadow-lg group-hover:shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-black text-white mb-1">{delta.field}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Code2 className="w-4 h-4" />
                              <span>{delta.section}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${config.bg} ${config.text} border ${config.border}`}>
                            {delta.type}
                          </span>
                        </div>
                        
                        {delta.type === "modified" && (
                          <div className="space-y-3">
                            <div className="bg-[#0A0A0A] border border-red-500/20 rounded-lg p-3">
                              <div className="text-xs text-red-400 font-bold mb-1">BEFORE</div>
                              <div className="text-sm text-gray-400 font-mono">{delta.value_before}</div>
                            </div>
                            <div className="flex justify-center">
                              <ArrowRight className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="bg-[#0A0A0A] border border-green-500/20 rounded-lg p-3">
                              <div className="text-xs text-green-400 font-bold mb-1">AFTER</div>
                              <div className="text-sm text-white font-mono">{delta.value_after}</div>
                            </div>
                          </div>
                        )}
                        
                        {delta.type === "added" && (
                          <div className="bg-[#0A0A0A] border border-green-500/20 rounded-lg p-3">
                            <div className="text-xs text-green-400 font-bold mb-1">ADDED</div>
                            <div className="text-sm text-white font-mono">{delta.value_after}</div>
                          </div>
                        )}
                        
                        {delta.type === "removed" && (
                          <div className="bg-[#0A0A0A] border border-red-500/20 rounded-lg p-3">
                            <div className="text-xs text-red-400 font-bold mb-1">REMOVED</div>
                            <div className="text-sm text-gray-400 font-mono line-through">{delta.value_before}</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
