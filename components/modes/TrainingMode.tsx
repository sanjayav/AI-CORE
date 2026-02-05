"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Brain,
  Users,
  Clock,
  Database,
  Zap,
  GitBranch,
  Activity,
  Target,
  TrendingUp,
  Settings,
  Play,
  Pause,
  BarChart3,
} from "lucide-react";

interface TrainingJob {
  id: string;
  name: string;
  model: string;
  status: "running" | "completed" | "paused";
  progress: number;
  lastUpdated: string;
  instructions: string;
  humanInLoop: boolean;
  metrics: {
    accuracy: number;
    loss: number;
    epochs: number;
  };
}

const mockTrainingJobs: TrainingJob[] = [
  {
    id: "train-1",
    name: "My New training",
    model: "Mistral-Medium 3.1",
    status: "running",
    progress: 67,
    lastUpdated: "Today at 8:33 AM",
    instructions: "**Task: Identify English-to-French Language Mismatch**",
    humanInLoop: true,
    metrics: {
      accuracy: 94.2,
      loss: 0.08,
      epochs: 42,
    },
  },
  {
    id: "train-2",
    name: "JLR Technical Spec Extraction",
    model: "AI Core v2.0",
    status: "completed",
    progress: 100,
    lastUpdated: "Yesterday at 3:15 PM",
    instructions: "**Task: Extract torque specifications from service manuals**",
    humanInLoop: true,
    metrics: {
      accuracy: 97.8,
      loss: 0.03,
      epochs: 100,
    },
  },
  {
    id: "train-3",
    name: "Defender Diagnostic Classifier",
    model: "AI Core v2.0",
    status: "paused",
    progress: 45,
    lastUpdated: "2 days ago",
    instructions: "**Task: Classify diagnostic trouble codes by subsystem**",
    humanInLoop: false,
    metrics: {
      accuracy: 89.5,
      loss: 0.15,
      epochs: 28,
    },
  },
];

export function TrainingMode() {
  const [selectedJob, setSelectedJob] = useState<TrainingJob | null>(mockTrainingJobs[0]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-4">
      <div className="max-w-[1920px] mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                Advanced R&D
              </h1>
              <p className="text-gray-400 text-base">
                Tailored, domain-specialized AI: from custom pre-training with your data
                to scaled deployment—with expert guidance throughout.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/30"
            >
              <Sparkles className="w-5 h-5" />
              New Training
            </motion.button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-white font-bold">Custom model training</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-orange-400 ml-auto" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-white font-bold">Deep use case exploration and applied AI</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-orange-400 ml-auto" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-white font-bold">Solution scaling and value realization</h3>
              </div>
              <CheckCircle2 className="w-5 h-5 text-orange-400 ml-auto" />
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-[#1A1A1A] border border-gray-800 text-white font-bold rounded-xl flex items-center gap-3 hover:border-orange-500/50 transition-all"
          >
            <span>Discover Applied AI</span>
            <ArrowRight className="w-5 h-5 text-orange-400" />
          </motion.button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Training Jobs List */}
          <div className="col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-400" />
                Training Jobs
              </h2>

              <div className="space-y-3">
                {mockTrainingJobs.map((job, idx) => (
                  <motion.button
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => setSelectedJob(job)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedJob?.id === job.id
                        ? "bg-orange-500/10 border-orange-500"
                        : "bg-[#2D2D2D] border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold text-sm">{job.name}</h3>
                      <StatusBadge status={job.status} />
                    </div>
                    <p className="text-gray-400 text-xs mb-3">{job.model}</p>
                    
                    {/* Progress Bar */}
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-600"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-orange-400 font-bold">{job.progress}%</span>
                    </div>

                    {job.humanInLoop && (
                      <div className="mt-3 flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <Users className="w-3 h-3 text-purple-400" />
                        <span className="text-purple-400 text-xs font-medium">Human-in-the-loop</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Training Details */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              {selectedJob && (
                <motion.div
                  key={selectedJob.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Job Header Card */}
                  <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-black text-white mb-2">{selectedJob.name}</h2>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Settings className="w-4 h-4" />
                            <span>Model: <span className="text-white font-medium">{selectedJob.model}</span></span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Last Updated: <span className="text-white font-medium">{selectedJob.lastUpdated}</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedJob.status === "running" ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
                          >
                            <Pause className="w-4 h-4" />
                            Pause
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Resume
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="p-4 bg-[#2D2D2D] rounded-xl mb-4">
                      <h3 className="text-sm font-bold text-gray-400 mb-2">Instructions</h3>
                      <p className="text-white text-sm leading-relaxed">{selectedJob.instructions}</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <MetricCard
                        icon={<Activity className="w-5 h-5" />}
                        label="Accuracy"
                        value={`${selectedJob.metrics.accuracy}%`}
                        color="text-green-400"
                        bgColor="bg-green-500/10"
                        borderColor="border-green-500/30"
                      />
                      <MetricCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        label="Loss"
                        value={selectedJob.metrics.loss.toFixed(2)}
                        color="text-blue-400"
                        bgColor="bg-blue-500/10"
                        borderColor="border-blue-500/30"
                      />
                      <MetricCard
                        icon={<GitBranch className="w-5 h-5" />}
                        label="Epochs"
                        value={selectedJob.metrics.epochs.toString()}
                        color="text-purple-400"
                        bgColor="bg-purple-500/10"
                        borderColor="border-purple-500/30"
                      />
                    </div>
                  </div>

                  {/* Training Visualization */}
                  <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-orange-400" />
                      Training Progress
                    </h3>
                    
                    <div className="h-64 bg-[#0A0A0A] rounded-xl border border-gray-800 flex items-center justify-center">
                      {/* Training Curve Visualization */}
                      <div className="relative w-full h-full p-6">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          {/* Grid lines */}
                          <g stroke="#2D2D2D" strokeWidth="1">
                            {[0, 50, 100, 150, 200].map((y) => (
                              <line key={y} x1="0" y1={y} x2="400" y2={y} />
                            ))}
                          </g>

                          {/* Training curve */}
                          <motion.path
                            d="M 10 180 Q 100 150, 150 80 T 390 20"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: selectedJob.progress / 100 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />

                          {/* Gradient definition */}
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#F97316" />
                              <stop offset="100%" stopColor="#FB923C" />
                            </linearGradient>
                          </defs>

                          {/* Data points */}
                          {[
                            { x: 10, y: 180 },
                            { x: 100, y: 120 },
                            { x: 200, y: 70 },
                            { x: 300, y: 40 },
                            { x: 390, y: 20 },
                          ].map((point, idx) => (
                            <motion.circle
                              key={idx}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#F97316"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: idx * 0.2 + 0.5 }}
                            />
                          ))}
                        </svg>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>Epoch 0</span>
                      <span>Current: Epoch {selectedJob.metrics.epochs}</span>
                      <span>Target: Epoch 100</span>
                    </div>
                  </div>

                  {/* Human-in-the-Loop Section */}
                  {selectedJob.humanInLoop && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Human-in-the-loop Active</h3>
                          <p className="text-purple-300 text-sm">3 samples pending review</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors"
                      >
                        <Zap className="w-5 h-5" />
                        Review Training Samples
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "running" | "completed" | "paused" }) {
  const config = {
    running: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      label: "Running",
    },
    completed: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      label: "Completed",
    },
    paused: {
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-400",
      label: "Paused",
    },
  };

  const { bg, border, text, label } = config[status];

  return (
    <div className={`px-2 py-1 ${bg} border ${border} rounded-lg`}>
      <span className={`${text} text-xs font-bold`}>{label}</span>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  color,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`p-4 ${bgColor} border ${borderColor} rounded-xl`}
    >
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className={`${color} text-2xl font-black`}>{value}</div>
    </motion.div>
  );
}
