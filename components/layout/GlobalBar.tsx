"use client";

import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Upload, Filter, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const programs = ["Defender", "Range Rover", "Discovery", "Evoque", "Range Rover Sport"];
const modelYears = ["2024", "2023", "2022", "2021", "2020"];
const subsystems = ["Powertrain", "Chassis", "E&E", "Body", "Interior"];
const docTypes = ["Service Manual", "Technical Specification", "Test Report", "Supplier Manual"];

export function GlobalBar() {
  const {
    scope,
    setScope,
    filters,
    setFilter,
    setUploadDrawerOpen,
  } = useStore();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-16 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-[1920px] mx-auto px-6 py-3">
        {/* Scope Selector */}
        <div className="flex items-center space-x-3 mb-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-gray-400">Scope:</span>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScope('library')}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                scope === 'library'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-[#2D2D2D] text-gray-300 hover:bg-[#3D3D3D]'
              }`}
            >
              {scope === 'library' && (
                <motion.div
                  layoutId="scope-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">JLR Library</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUploadDrawerOpen(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#2D2D2D] text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload...</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScope('combined')}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                scope === 'combined'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-[#2D2D2D] text-gray-300 hover:bg-[#3D3D3D]'
              }`}
            >
              {scope === 'combined' && (
                <motion.div
                  layoutId="scope-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Library + Upload</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {scope !== 'library' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: -10 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 flex items-center space-x-1"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
                <span>{scope === 'upload' ? 'Upload Active' : 'Combined Sources'}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-orange-400 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Filter Chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-visible"
            >
              <div className="flex items-center space-x-3 pb-2">
                <FilterDropdown
                  label="Program"
                  value={filters.program}
                  options={programs}
                  onChange={(val) => setFilter('program', val)}
                />
                
                <FilterDropdown
                  label="Model Year"
                  value={filters.modelYear}
                  options={modelYears}
                  onChange={(val) => setFilter('modelYear', val)}
                />
                
                <FilterDropdown
                  label="Subsystem"
                  value={filters.subsystem}
                  options={subsystems}
                  onChange={(val) => setFilter('subsystem', val)}
                />
                
                <FilterDropdown
                  label="Doc Type"
                  value={filters.docType}
                  options={docTypes}
                  onChange={(val) => setFilter('docType', val)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold flex items-center space-x-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all"
      >
        <span>{label}: {value}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full left-0 mt-2 w-72 bg-[#1A1A1A] rounded-2xl shadow-2xl border-2 border-gray-800 overflow-hidden z-[9999]"
            style={{ maxHeight: '320px' }}
          >
            <div className="overflow-y-auto max-h-80 py-2">
              {options.map((option, idx) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 400 }}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-6 py-4 text-left text-sm font-medium transition-all duration-200 flex items-center justify-between group/item ${
                    option === value
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold'
                      : 'text-gray-300 hover:bg-orange-500/10 hover:text-orange-400 hover:translate-x-2'
                  }`}
                >
                  <span>{option}</span>
                  {option === value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
