"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Download, Table as TableIcon, Code, CheckSquare, Search, Filter, AlertCircle, CheckCircle2, FileCode } from "lucide-react";
import { useStore } from "@/lib/store";
import realExtract from "@/data/realExtract.json";

export function ExtractMode() {
  const { extractViewMode, setExtractViewMode } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  const viewModes = [
    { id: "table", label: "Table", icon: TableIcon },
    { id: "json", label: "JSON", icon: Code },
    { id: "checklist", label: "Checklist", icon: CheckSquare },
  ];

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const filteredData = realExtract.data.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.max_plastic_strain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCritical = !showCriticalOnly || item.critical;
    return matchesSearch && matchesCritical;
  });

  const progress = filteredData.length > 0 ? Math.round((checkedItems.size / filteredData.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="min-h-screen bg-[#0A0A0A] pt-4 pb-16">
        <div className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Data Extraction</h1>
                    <p className="text-sm text-gray-400">Extract structured data from documents with citations</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#1A1A1A] border border-gray-800 text-gray-300 rounded-lg flex items-center gap-2 hover:border-orange-500/50 transition-all text-sm font-bold"
                >
                  <Download className="w-4 h-4" />
                  Export
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
              <div className="text-3xl font-black text-orange-400 mb-1">{realExtract.totalRecords}</div>
              <div className="text-sm text-gray-400 font-medium">Total Records</div>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
              <div className="text-3xl font-black text-green-400 mb-1">{filteredData.length}</div>
              <div className="text-sm text-gray-400 font-medium">Filtered Results</div>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
              <div className="text-3xl font-black text-red-400 mb-1">{realExtract.data.filter(d => d.critical).length}</div>
              <div className="text-sm text-gray-400 font-medium">Critical Items</div>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
              <div className="text-3xl font-black text-blue-400 mb-1">{progress}%</div>
              <div className="text-sm text-gray-400 font-medium">Completion</div>
            </div>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search components, materials, or strain values..."
                  className="w-full pl-10 pr-4 py-2 bg-[#2D2D2D] border border-gray-700 text-white placeholder-gray-500 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Critical Filter */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCriticalOnly(!showCriticalOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  showCriticalOnly
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-[#2D2D2D] border border-gray-700 text-gray-300 hover:border-red-500/50"
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                Critical Only
              </motion.button>

              {/* View Mode Toggles */}
              <div className="flex items-center gap-2">
                {viewModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <motion.button
                      key={mode.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExtractViewMode(mode.id as any)}
                      className={`p-2 rounded-lg transition-all ${
                        extractViewMode === mode.id
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                          : "bg-[#2D2D2D] text-gray-400 hover:text-white"
                      }`}
                      title={mode.label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {extractViewMode === "table" && (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1A1A1A] border-2 border-gray-800 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b-2 border-orange-500/20">
                        <th className="px-6 py-5 text-left text-xs font-black text-orange-400 uppercase tracking-wider">Component</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-orange-400 uppercase tracking-wider">Material</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-orange-400 uppercase tracking-wider">Acceptance</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-orange-400 uppercase tracking-wider">Max Strain</th>
                        <th className="px-6 py-5 text-center text-xs font-black text-orange-400 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-orange-400 uppercase tracking-wider">Engineering Notes</th>
                        <th className="px-6 py-5 text-center text-xs font-black text-orange-400 uppercase tracking-wider">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, idx) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className={`
                            group relative border-l-4 transition-all duration-200
                            ${item.critical 
                              ? "border-l-red-500 bg-red-500/5 hover:bg-red-500/10" 
                              : idx % 2 === 0 
                                ? "border-l-transparent bg-[#0A0A0A]/50 hover:bg-[#2D2D2D]" 
                                : "border-l-transparent bg-[#1A1A1A] hover:bg-[#2D2D2D]"
                            }
                            ${item.critical ? "border-b-2 border-b-red-500/20" : "border-b border-b-gray-800"}
                          `}
                        >
                          {/* Component Name */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              {item.critical && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                                />
                              )}
                              <span className={`text-sm font-bold ${item.critical ? "text-white" : "text-gray-200"}`}>
                                {item.component}
                              </span>
                            </div>
                          </td>

                          {/* Material */}
                          <td className="px-6 py-5">
                            <span className={`text-xs font-medium ${item.critical ? "text-gray-200" : "text-gray-400"}`}>
                              {item.material}
                            </span>
                          </td>

                          {/* Acceptance Criteria */}
                          <td className="px-6 py-5">
                            <div className="inline-block px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-bold font-mono">
                              {item.acceptance_criteria}
                            </div>
                          </td>

                          {/* Max Plastic Strain */}
                          <td className="px-6 py-5">
                            <div className={`
                              inline-block px-4 py-2 rounded-lg font-mono text-sm font-bold
                              ${item.critical 
                                ? "bg-red-500/20 border border-red-500/40 text-red-300" 
                                : "bg-green-500/10 border border-green-500/30 text-green-300"
                              }
                            `}>
                              {item.max_plastic_strain}
                            </div>
                          </td>

                          {/* Priority Badge */}
                          <td className="px-6 py-5 text-center">
                            {item.critical ? (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/50 rounded-lg"
                              >
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span className="text-xs font-black text-red-400 uppercase">Critical</span>
                              </motion.div>
                            ) : (
                              <span className="inline-block px-3 py-1.5 bg-gray-700/20 border border-gray-700 rounded-lg text-xs font-bold text-gray-500 uppercase">
                                Standard
                              </span>
                            )}
                          </td>

                          {/* Notes */}
                          <td className="px-6 py-5">
                            <div className="max-w-md">
                              <p className={`text-sm leading-relaxed ${item.critical ? "text-gray-300" : "text-gray-500"}`}>
                                {item.notes}
                              </p>
                            </div>
                          </td>

                          {/* Citation */}
                          <td className="px-6 py-5 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`
                                px-4 py-2 rounded-lg text-xs font-black transition-all shadow-lg
                                ${item.critical
                                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/30 hover:shadow-orange-500/50"
                                  : "bg-[#2D2D2D] border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500"
                                }
                              `}
                            >
                              {item.citations[0].section}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Results Summary Footer */}
                <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-t-2 border-orange-500/20 px-6 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-gray-400">Critical: <span className="font-bold text-white">{filteredData.filter(d => d.critical).length}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <span className="text-gray-400">Standard: <span className="font-bold text-white">{filteredData.filter(d => !d.critical).length}</span></span>
                      </div>
                    </div>
                    <span className="text-gray-400">
                      Showing <span className="font-bold text-orange-400">{filteredData.length}</span> of <span className="font-bold text-white">{realExtract.data.length}</span> records
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {extractViewMode === "json" && (
              <motion.div
                key="json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1A1A1A] border-2 border-gray-800 rounded-xl overflow-hidden shadow-xl"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b-2 border-orange-500/20 px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <FileCode className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">JSON Output</h3>
                      <p className="text-xs text-gray-400">Structured data export format</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-xs font-bold hover:bg-green-500/20 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Copy JSON
                  </motion.button>
                </div>

                {/* JSON Content */}
                <div className="p-6">
                  <pre className="bg-[#0A0A0A] border-2 border-gray-800 rounded-lg p-6 overflow-x-auto text-sm shadow-inner">
                    <code className="font-mono">
                      <span className="text-gray-500">{`{`}</span>
                      {"\n  "}<span className="text-orange-400">"query"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{realExtract.query}"</span><span className="text-gray-500">,</span>
                      {"\n  "}<span className="text-orange-400">"extractType"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{realExtract.extractType}"</span><span className="text-gray-500">,</span>
                      {"\n  "}<span className="text-orange-400">"totalRecords"</span><span className="text-gray-500">:</span> <span className="text-blue-400">{filteredData.length}</span><span className="text-gray-500">,</span>
                      {"\n  "}<span className="text-orange-400">"data"</span><span className="text-gray-500">: [</span>
                      {filteredData.slice(0, 5).map((item, idx) => (
                        <span key={item.id}>
                          {"\n    "}<span className="text-gray-500">{`{`}</span>
                          {"\n      "}<span className="text-orange-400">"component"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{item.component}"</span><span className="text-gray-500">,</span>
                          {"\n      "}<span className="text-orange-400">"material"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{item.material}"</span><span className="text-gray-500">,</span>
                          {"\n      "}<span className="text-orange-400">"max_plastic_strain"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{item.max_plastic_strain}"</span><span className="text-gray-500">,</span>
                          {"\n      "}<span className="text-orange-400">"critical"</span><span className="text-gray-500">:</span> <span className={item.critical ? "text-red-400" : "text-blue-400"}>{String(item.critical)}</span>
                          {"\n    "}<span className="text-gray-500">{`}`}</span>{idx < Math.min(filteredData.length, 5) - 1 ? <span className="text-gray-500">,</span> : ""}
                        </span>
                      ))}
                      {filteredData.length > 5 && (
                        <>
                          {"\n    "}<span className="text-gray-500">...</span>
                        </>
                      )}
                      {"\n  "}<span className="text-gray-500">]</span>
                      {"\n"}<span className="text-gray-500">{`}`}</span>
                    </code>
                  </pre>
                </div>

                {/* Footer Stats */}
                <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-t-2 border-green-500/20 px-6 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Data structure: <span className="font-bold text-green-400">JSON</span>
                    </span>
                    <span className="text-gray-400">
                      Size: <span className="font-bold text-white">{filteredData.length} objects</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {extractViewMode === "checklist" && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1A1A1A] border-2 border-gray-800 rounded-xl overflow-hidden shadow-xl"
              >
                {/* Progress Header */}
                <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b-2 border-orange-500/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <CheckSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">Verification Checklist</h3>
                        <p className="text-xs text-gray-400">Track torque specification verification</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-black text-orange-400">{progress}%</div>
                        <div className="text-xs text-gray-400">{checkedItems.size} of {filteredData.length} verified</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 shadow-lg"
                      style={{
                        boxShadow: progress > 0 ? "0 0 10px rgba(249, 115, 22, 0.5)" : "none"
                      }}
                    />
                  </div>
                </div>

                {/* Checklist Items */}
                <div>
                  {filteredData.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`
                        group relative border-l-4 transition-all duration-200
                        ${checkedItems.has(idx)
                          ? "border-l-green-500 bg-green-500/5"
                          : item.critical
                            ? "border-l-red-500 bg-red-500/5 hover:bg-red-500/10"
                            : idx % 2 === 0
                              ? "border-l-transparent bg-[#0A0A0A]/50 hover:bg-[#2D2D2D]"
                              : "border-l-transparent bg-[#1A1A1A] hover:bg-[#2D2D2D]"
                        }
                        ${item.critical && !checkedItems.has(idx) ? "border-b-2 border-b-red-500/20" : "border-b border-b-gray-800"}
                      `}
                    >
                      <div className="p-6 flex items-start gap-4">
                        {/* Checkbox */}
                        <motion.button
                          onClick={() => toggleCheck(idx)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`
                            flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all shadow-lg
                            ${checkedItems.has(idx)
                              ? "bg-gradient-to-br from-green-500 to-green-600 border-green-500 shadow-green-500/50"
                              : item.critical
                                ? "border-red-500/50 hover:border-red-500 hover:bg-red-500/10"
                                : "border-gray-700 hover:border-orange-500 hover:bg-orange-500/10"
                            }
                          `}
                        >
                          {checkedItems.has(idx) && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            </motion.div>
                          )}
                        </motion.button>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {/* Critical Indicator */}
                            {item.critical && !checkedItems.has(idx) && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                              />
                            )}
                            
                            {/* Component Name */}
                            <h4 className={`text-base font-bold transition-all ${
                              checkedItems.has(idx) 
                                ? "text-gray-500 line-through" 
                                : item.critical
                                  ? "text-white"
                                  : "text-gray-200"
                            }`}>
                              {item.component}
                            </h4>

                            {/* Priority Badge */}
                            {item.critical && !checkedItems.has(idx) && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/50 rounded-lg"
                              >
                                <AlertCircle className="w-3 h-3 text-red-400" />
                                <span className="text-xs font-black text-red-400 uppercase">Critical</span>
                              </motion.div>
                            )}

                            {/* Verified Badge */}
                            {checkedItems.has(idx) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 border-2 border-green-500/50 rounded-lg"
                              >
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <span className="text-xs font-black text-green-400 uppercase">Verified</span>
                              </motion.div>
                            )}
                          </div>

                          {/* Strain Info */}
                          <div className="flex gap-2 mb-3 flex-wrap">
                            <div className={`
                              inline-block px-3 py-1.5 rounded-lg font-mono text-xs font-bold
                              ${checkedItems.has(idx)
                                ? "bg-gray-700/20 border border-gray-700 text-gray-500"
                                : item.critical
                                  ? "bg-red-500/20 border border-red-500/40 text-red-300"
                                  : "bg-green-500/10 border border-green-500/30 text-green-300"
                              }
                            `}>
                              Strain: {item.max_plastic_strain}
                            </div>
                            <div className="inline-block px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold font-mono">
                              Target: {item.acceptance_criteria}
                            </div>
                          </div>
                          <div className={`text-xs mb-2 ${checkedItems.has(idx) ? "text-gray-600" : "text-gray-500"}`}>
                            Material: {item.material}
                          </div>

                          {/* Notes */}
                          <p className={`text-sm leading-relaxed ${
                            checkedItems.has(idx) ? "text-gray-600" : "text-gray-400"
                          }`}>
                            {item.notes}
                          </p>

                          {/* Citation */}
                          <div className="mt-3">
                            <motion.button
                              whileHover={{ scale: 1.02, x: 2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`
                                px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                ${checkedItems.has(idx)
                                  ? "bg-gray-700/20 border border-gray-700 text-gray-600"
                                  : "bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                                }
                              `}
                            >
                              Ref: {item.citations[0].section}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary Footer */}
                <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-t-2 border-purple-500/20 px-6 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-400">Verified: <span className="font-bold text-green-400">{checkedItems.size}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-gray-400">Pending: <span className="font-bold text-red-400">{filteredData.filter((d, i) => !checkedItems.has(i) && d.critical).length}</span> critical</span>
                      </div>
                    </div>
                    <span className="text-gray-400">
                      Remaining: <span className="font-bold text-orange-400">{filteredData.length - checkedItems.size}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
