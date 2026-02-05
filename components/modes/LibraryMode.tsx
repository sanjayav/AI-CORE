"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Library, Search, Grid3x3, List, FileText, Calendar, User, Tag, Download } from "lucide-react";
import mockLibrary from "@/data/mockLibrary.json";

export function LibraryMode() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    total: mockLibrary.documents.length,
    active: mockLibrary.documents.filter(d => d.status === "active").length,
    archived: mockLibrary.documents.filter(d => d.status === "archived").length,
  };

  const filteredDocs = mockLibrary.documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="min-h-screen bg-[#0A0A0A] pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Library className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Document Library</h1>
          </div>
          <p className="text-base text-gray-400">
            Browse and manage your technical documentation corpus
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-5"
          >
            <div className="text-3xl font-black text-orange-400">{stats.total}</div>
            <div className="text-sm font-medium text-orange-300">Total Documents</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-5"
          >
            <div className="text-3xl font-black text-green-400">{stats.active}</div>
            <div className="text-sm font-medium text-green-300">Active</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-5"
          >
            <div className="text-3xl font-black text-blue-400">{stats.archived}</div>
            <div className="text-sm font-medium text-blue-300">Archived</div>
          </motion.div>
        </motion.div>

        {/* Search and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#2D2D2D] border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-[#2D2D2D] text-gray-400 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-[#2D2D2D] text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Document Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-5 hover:border-orange-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <FileText className="w-6 h-6 text-orange-400" />
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>

                  <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mb-4">{doc.id}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{doc.lastModified}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <User className="w-3 h-3" />
                      <span>{doc.accessLevel}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {doc.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#2D2D2D] text-gray-400 text-xs rounded-lg border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ x: 4 }}
                  className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-5 hover:border-orange-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors flex-shrink-0">
                        <FileText className="w-6 h-6 text-orange-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm mb-1 group-hover:text-orange-400 transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">{doc.id}</p>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{doc.lastModified}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span>{doc.accessLevel}</span>
                        </div>
                        <div className="flex gap-1">
                          {doc.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#2D2D2D] text-gray-400 text-xs rounded-lg border border-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusBadge status={doc.status} />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-[#2D2D2D] text-gray-400 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; border: string; text: string }> = {
    active: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
    },
    updated: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
    },
    archived: {
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-400",
    },
  };

  const styles = config[status] || config.active;

  return (
    <div className={`px-2 py-1 ${styles.bg} border ${styles.border} rounded-lg`}>
      <span className={`${styles.text} text-xs font-bold capitalize`}>{status}</span>
    </div>
  );
}
