"use client";

import { useState, useRef } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Upload, FileText, CheckCircle2, Loader2, Sparkles, 
  AlertCircle, File, Calendar, User, Shield, Tag, HardDrive,
  Clock, Zap, Database, Eye
} from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export function UploadDrawer() {
  const { uploadDrawerOpen, setUploadDrawerOpen, setUploadedDoc, setScope } = useStore();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'ready'>('idle');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [docType, setDocType] = useState('Supplier Manual');
  const [program, setProgram] = useState('Defender');
  const [visibility, setVisibility] = useState('private');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = (file: File) => {
    const fileData: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    };
    
    setUploadedFile(fileData);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadStatus('processing');
          // Simulate processing
          setTimeout(() => {
            setUploadStatus('ready');
            setUploadedDoc(fileData.name);
          }, 2500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAskOnDocument = () => {
    setScope('upload');
    setUploadDrawerOpen(false);
  };

  const handleReset = () => {
    setUploadStatus('idle');
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AnimatePresence>
      {uploadDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (uploadStatus === 'idle' || uploadStatus === 'ready') {
                setUploadDrawerOpen(false);
              }
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[650px] bg-[#0A0A0A] shadow-2xl z-50 flex flex-col border-l-2 border-gray-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b-2 border-gray-800 bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A]">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    rotate: uploadStatus === 'processing' ? [0, 360] : 0,
                    scale: uploadStatus === 'uploading' ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
                >
                  <Upload className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-white">Upload Document</h2>
                  <p className="text-sm text-gray-400">Add engineering documentation to your knowledge base</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (uploadStatus === 'idle' || uploadStatus === 'ready') {
                    setUploadDrawerOpen(false);
                  }
                }}
                disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
                className="p-2 hover:bg-white/10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {uploadStatus === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Drag & Drop Area */}
                    <motion.div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      animate={{
                        borderColor: isDragging ? '#F97316' : '#374151',
                        backgroundColor: isDragging ? 'rgba(249, 115, 22, 0.05)' : 'rgba(26, 26, 26, 0.5)',
                        scale: isDragging ? 1.02 : 1
                      }}
                      className="border-4 border-dashed rounded-3xl p-16 text-center hover:border-orange-500 hover:bg-orange-500/5 transition-all cursor-pointer group"
                    >
                      <motion.div
                        animate={{
                          y: isDragging ? -10 : [0, -15, 0],
                          rotate: isDragging ? 5 : 0
                        }}
                        transition={{ 
                          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 0.3 }
                        }}
                        className="w-28 h-28 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40"
                      >
                        <Upload className="w-14 h-14 text-white" strokeWidth={2.5} />
                      </motion.div>

                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors">
                        {isDragging ? '📥 Drop your file here' : '📄 Drag & drop your document'}
                      </h3>
                      <p className="text-base text-gray-400 mb-8">
                        or click anywhere to browse files
                      </p>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-xl shadow-orange-500/30 transition-all"
                      >
                        <File className="w-5 h-5" />
                        <span>Select File from Computer</span>
                      </motion.div>
                    </motion.div>

                    {/* Supported Formats */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-black text-blue-400 mb-2">Supported File Types</h4>
                          <div className="text-sm text-gray-300 leading-relaxed">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {['PDF', 'DOCX', 'DOC', 'TXT', 'RTF'].map((format) => (
                                <span key={format} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-bold text-blue-300">
                                  {format}
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-400 text-xs">Maximum file size: <span className="text-white font-bold">50 MB</span></p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Document Metadata */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-5"
                    >
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <Tag className="w-5 h-5 text-orange-400" />
                        Document Classification
                      </h3>

                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">
                          Document Type
                        </label>
                        <select 
                          value={docType}
                          onChange={(e) => setDocType(e.target.value)}
                          className="w-full px-5 py-4 bg-[#1A1A1A] border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium"
                        >
                          <option>Service Manual</option>
                          <option>Technical Specification</option>
                          <option>Supplier Manual</option>
                          <option>Test Report</option>
                          <option>Engineering Change Notice</option>
                          <option>Field Report</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">
                          Program
                        </label>
                        <select 
                          value={program}
                          onChange={(e) => setProgram(e.target.value)}
                          className="w-full px-5 py-4 bg-[#1A1A1A] border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium"
                        >
                          <option>Defender</option>
                          <option>Range Rover</option>
                          <option>Range Rover Sport</option>
                          <option>Discovery</option>
                          <option>Evoque</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-3">
                          Visibility & Access
                        </label>
                        <div className="flex gap-4">
                          <motion.label 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl cursor-pointer transition-all ${
                              visibility === 'private' 
                                ? 'bg-orange-500/20 border-2 border-orange-500' 
                                : 'bg-[#1A1A1A] border-2 border-gray-800 hover:border-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="visibility"
                              value="private"
                              checked={visibility === 'private'}
                              onChange={(e) => setVisibility(e.target.value)}
                              className="sr-only"
                            />
                            <Shield className={`w-5 h-5 ${visibility === 'private' ? 'text-orange-400' : 'text-gray-500'}`} />
                            <div>
                              <div className={`text-sm font-bold ${visibility === 'private' ? 'text-white' : 'text-gray-400'}`}>
                                Private
                              </div>
                              <div className="text-xs text-gray-500">Only you</div>
                            </div>
                          </motion.label>

                          <motion.label 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl cursor-pointer transition-all ${
                              visibility === 'team' 
                                ? 'bg-orange-500/20 border-2 border-orange-500' 
                                : 'bg-[#1A1A1A] border-2 border-gray-800 hover:border-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="visibility"
                              value="team"
                              checked={visibility === 'team'}
                              onChange={(e) => setVisibility(e.target.value)}
                              className="sr-only"
                            />
                            <User className={`w-5 h-5 ${visibility === 'team' ? 'text-orange-400' : 'text-gray-500'}`} />
                            <div>
                              <div className={`text-sm font-bold ${visibility === 'team' ? 'text-white' : 'text-gray-400'}`}>
                                Team
                              </div>
                              <div className="text-xs text-gray-500">Engineering</div>
                            </div>
                          </motion.label>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {uploadStatus === 'uploading' && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-8"
                  >
                    {/* File Preview */}
                    <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white text-lg truncate mb-1">
                            {uploadedFile?.name}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>{formatFileSize(uploadedFile?.size || 0)}</span>
                            <span>•</span>
                            <span>{docType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Upload Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Zap className="w-5 h-5 text-orange-400" />
                            </motion.div>
                            <span className="text-sm font-bold text-white">Uploading...</span>
                          </div>
                          <span className="text-sm font-black text-orange-400">{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg"
                            style={{ boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Upload Info */}
                    <div className="text-center">
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-gray-400 text-sm"
                      >
                        Please wait while we securely upload your document...
                      </motion.p>
                    </div>
                  </motion.div>
                )}

                {uploadStatus === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-8"
                  >
                    {/* Processing Animation */}
                    <div className="flex flex-col items-center text-center py-12">
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                        className="w-32 h-32 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center mb-8 shadow-2xl shadow-orange-500/50"
                      >
                        <Sparkles className="w-16 h-16 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-white mb-3">
                        Processing Document
                      </h3>
                      <p className="text-base text-gray-400 mb-8 max-w-md">
                        AI CORE is analyzing and indexing your document for intelligent search
                      </p>
                    </div>

                    {/* Processing Steps */}
                    <div className="space-y-4">
                      <ProcessingStep
                        icon={CheckCircle2}
                        label="File upload complete"
                        progress={100}
                        complete
                        delay={0}
                      />
                      <ProcessingStep
                        icon={FileText}
                        label="Extracting text and structure"
                        progress={85}
                        delay={0.1}
                      />
                      <ProcessingStep
                        icon={Database}
                        label="Generating vector embeddings"
                        progress={65}
                        delay={0.2}
                      />
                      <ProcessingStep
                        icon={Zap}
                        label="Indexing for AI search"
                        progress={40}
                        delay={0.3}
                      />
                      <ProcessingStep
                        icon={Eye}
                        label="Creating knowledge graph"
                        progress={20}
                        delay={0.4}
                      />
                    </div>
                  </motion.div>
                )}

                {uploadStatus === 'ready' && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-8"
                  >
                    {/* Success Animation */}
                    <div className="flex flex-col items-center text-center py-12">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-32 h-32 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-8 shadow-2xl shadow-green-500/50"
                      >
                        <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-black text-white mb-3"
                      >
                        🎉 Document Ready!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-base text-gray-400 mb-2"
                      >
                        Your document has been successfully indexed
                      </motion.p>
                    </div>

                    {/* Document Summary Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-green-500/30 rounded-2xl p-8 shadow-xl"
                    >
                      <div className="flex items-start gap-5 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                          <FileText className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-black text-white text-xl mb-3">
                            {uploadedFile?.name}
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <HardDrive className="w-4 h-4" />
                              <span>{formatFileSize(uploadedFile?.size || 0)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Tag className="w-4 h-4" />
                              <span>{docType}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{program}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Shield className="w-4 h-4" />
                              <span className="capitalize">{visibility}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-bold text-green-400">Indexed & Ready</span>
                            <span className="text-sm text-gray-500">• Just now</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAskOnDocument}
                          className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-5 h-5" />
                          <span>Ask Questions</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleReset}
                          className="px-6 py-4 bg-[#1A1A1A] border-2 border-gray-800 text-gray-300 rounded-xl font-bold hover:border-gray-700 transition-all"
                        >
                          Upload Another
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-black text-blue-400 mb-2">What's Next?</h4>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Ask questions about this document using natural language</li>
                            <li>• Compare it with library documents to detect conflicts</li>
                            <li>• Extract structured data like specifications and procedures</li>
                            <li>• All answers will be cited with specific page references</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ProcessingStepProps {
  icon: any;
  label: string;
  progress: number;
  complete?: boolean;
  delay: number;
}

function ProcessingStep({ icon: Icon, label, progress, complete = false, delay }: ProcessingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-[#1A1A1A] border-2 border-gray-800 rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {complete ? (
            <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Icon className="w-5 h-5 text-orange-400" />
              </motion.div>
            </div>
          )}
          <span className="text-sm font-bold text-white">{label}</span>
        </div>
        <span className={`text-sm font-black ${complete ? 'text-green-400' : 'text-orange-400'}`}>
          {progress}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${
            complete
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : 'bg-gradient-to-r from-orange-500 to-orange-600'
          }`}
          style={{ boxShadow: complete ? '0 0 10px rgba(34, 197, 94, 0.5)' : '0 0 10px rgba(249, 115, 22, 0.5)' }}
        />
      </div>
    </motion.div>
  );
}
