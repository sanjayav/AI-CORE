"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, CheckCircle, XCircle, Loader, Activity, Database, Shield, Users,
  Clock, RefreshCw, Download, Play, Pause, AlertTriangle, Zap, BarChart3, 
  FileText, TrendingUp, TrendingDown, Server, Cpu, HardDrive, Wifi, Eye,
  UserCheck, Lock, Key, Globe, Search, Filter, Calendar, ArrowUpRight,
  GitBranch, Package, Layers, Target, Sparkles, Upload
} from "lucide-react";
import mockAdmin from "@/data/mockAdmin.json";

type TabType = "overview" | "jobs" | "health" | "audit" | "permissions";

export function AdminMode() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [liveMetrics, setLiveMetrics] = useState({
    activeQueries: 23,
    avgResponseTime: 487,
    successRate: 98.5,
    uptime: 99.97
  });

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeQueries: Math.max(0, prev.activeQueries + Math.floor(Math.random() * 10 - 5)),
        avgResponseTime: Math.max(100, prev.avgResponseTime + Math.floor(Math.random() * 100 - 50)),
        successRate: Math.min(100, Math.max(95, prev.successRate + (Math.random() - 0.5))),
        uptime: Math.min(100, Math.max(99, prev.uptime + (Math.random() - 0.5) * 0.01))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ingestionStatus = mockAdmin.ingestionStatus;
  const recentJobs = mockAdmin.recentJobs;
  const indexHealth = mockAdmin.indexHealth;
  const auditTrail = mockAdmin.auditTrail;
  const permissions = mockAdmin.permissions;

  const filteredAudit = auditTrail.filter(entry => {
    const matchesSearch = searchQuery === "" ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.query && entry.query.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === "all" || entry.action === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const tabs = [
    { id: "overview", label: "System Overview", icon: Activity },
    { id: "jobs", label: "Ingestion Jobs", icon: Package },
    { id: "health", label: "Index Health", icon: Database },
    { id: "audit", label: "Audit Trail", icon: Shield },
    { id: "permissions", label: "Permissions", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="min-h-screen bg-[#0A0A0A] pt-4 pb-16">
        <div className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white tracking-tight">System Administration</h1>
                  <p className="text-base text-gray-400 mt-1">Monitor, manage, and maintain AI CORE infrastructure</p>
                </div>
              </div>

              {/* Live Clock & Status */}
              <div className="flex items-center gap-4">
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-500"
                    />
                    <span className="text-sm font-bold text-green-400">System Online</span>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold text-white font-mono">
                      {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-gray-800 rounded-xl p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`
                      flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all
                      ${activeTab === tab.id
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "text-gray-400 hover:text-white hover:bg-[#2D2D2D]"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Live Metrics */}
                <div className="grid grid-cols-4 gap-6">
                  <MetricCard
                    icon={Activity}
                    label="Active Queries"
                    value={liveMetrics.activeQueries}
                    unit="requests"
                    trend={5.2}
                    color="orange"
                  />
                  <MetricCard
                    icon={Zap}
                    label="Avg Response Time"
                    value={liveMetrics.avgResponseTime}
                    unit="ms"
                    trend={-3.1}
                    color="blue"
                  />
                  <MetricCard
                    icon={CheckCircle}
                    label="Success Rate"
                    value={liveMetrics.successRate}
                    unit="%"
                    trend={0.3}
                    color="green"
                  />
                  <MetricCard
                    icon={TrendingUp}
                    label="System Uptime"
                    value={liveMetrics.uptime}
                    unit="%"
                    trend={0}
                    color="purple"
                  />
                </div>

                {/* System Status */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Ingestion Status */}
                  <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                          <Package className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">Document Ingestion</h3>
                          <p className="text-xs text-gray-400">Real-time indexing status</p>
                        </div>
                      </div>
                      <RefreshCw className="w-5 h-5 text-gray-600 hover:text-orange-400 cursor-pointer transition-colors" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#0A0A0A] rounded-xl p-4 border border-gray-800">
                        <div className="text-3xl font-black text-white mb-1">{ingestionStatus.totalDocuments}</div>
                        <div className="text-xs text-gray-400">Total Documents</div>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-xl p-4 border border-green-500/30">
                        <div className="text-3xl font-black text-green-400 mb-1">{ingestionStatus.indexed}</div>
                        <div className="text-xs text-gray-400">Indexed</div>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-xl p-4 border border-orange-500/30">
                        <div className="text-3xl font-black text-orange-400 mb-1">{ingestionStatus.processing}</div>
                        <div className="text-xs text-gray-400">Processing</div>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-xl p-4 border border-red-500/30">
                        <div className="text-3xl font-black text-red-400 mb-1">{ingestionStatus.failed}</div>
                        <div className="text-xs text-gray-400">Failed</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Last update: {new Date(ingestionStatus.lastUpdate).toLocaleString()}
                    </div>
                  </div>

                  {/* Index Health */}
                  <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                          <Database className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">Index Health</h3>
                          <p className="text-xs text-gray-400">Performance metrics</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-400">{indexHealth.overall}%</div>
                        <div className="text-xs text-gray-400">Overall</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <HealthMetric label="Vector Store" value={indexHealth.vectorStore} />
                      <HealthMetric label="Metadata Index" value={indexHealth.metadata} />
                      <HealthMetric label="Search Performance" value={indexHealth.searchPerformance} />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    <ActionButton icon={RefreshCw} label="Reindex All" color="orange" />
                    <ActionButton icon={Download} label="Export Logs" color="blue" />
                    <ActionButton icon={Shield} label="Security Scan" color="purple" />
                    <ActionButton icon={BarChart3} label="Generate Report" color="green" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "jobs" && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {recentJobs.map((job, idx) => (
                  <JobCard key={job.id} job={job} delay={idx * 0.05} />
                ))}
              </motion.div>
            )}

            {activeTab === "health" && (
              <motion.div
                key="health"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Overall Health */}
                <div className="bg-[#1A1A1A] border-2 border-green-500/30 rounded-2xl p-8 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/50"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <h2 className="text-4xl font-black text-white mb-2">System Healthy</h2>
                  <p className="text-lg text-green-400 font-bold">{indexHealth.overall}% Overall Health Score</p>
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-3 gap-6">
                  <HealthCard
                    icon={Database}
                    label="Vector Store"
                    value={indexHealth.vectorStore}
                    status="excellent"
                    details="24.5M vectors indexed"
                  />
                  <HealthCard
                    icon={Layers}
                    label="Metadata Index"
                    value={indexHealth.metadata}
                    status="good"
                    details="2,055 documents cataloged"
                  />
                  <HealthCard
                    icon={Zap}
                    label="Search Performance"
                    value={indexHealth.searchPerformance}
                    status="excellent"
                    details="< 500ms avg latency"
                  />
                </div>

                {/* Resource Usage */}
                <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                    <Server className="w-5 h-5 text-orange-400" />
                    Resource Usage
                  </h3>
                  <div className="grid grid-cols-4 gap-6">
                    <ResourceMetric icon={Cpu} label="CPU Usage" value={34} color="orange" />
                    <ResourceMetric icon={HardDrive} label="Memory" value={67} color="blue" />
                    <ResourceMetric icon={Database} label="Storage" value={42} color="purple" />
                    <ResourceMetric icon={Wifi} label="Network" value={23} color="green" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "audit" && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Search & Filters */}
                <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search audit logs..."
                        className="w-full pl-11 pr-4 py-3 bg-[#2D2D2D] border border-gray-700 text-white placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-3 bg-[#2D2D2D] border border-gray-700 text-white rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="all">All Actions</option>
                      <option value="query">Queries</option>
                      <option value="compare">Comparisons</option>
                      <option value="upload">Uploads</option>
                      <option value="extract">Extractions</option>
                    </select>
                  </div>
                </div>

                {/* Audit Trail */}
                <div className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#0A0A0A] border-b border-gray-800">
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Timestamp</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">User</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Action</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Details</th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAudit.map((entry, idx) => (
                          <AuditRow key={entry.id} entry={entry} delay={idx * 0.02} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "permissions" && (
              <motion.div
                key="permissions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  {permissions.map((role, idx) => (
                    <PermissionCard key={role.role} role={role} delay={idx * 0.1} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Component: Metric Card
function MetricCard({ icon: Icon, label, value, unit, trend, color }: any) {
  const colorMap: any = {
    orange: "from-orange-500 to-orange-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}{unit}</div>
      <div className="text-sm text-gray-400 font-medium">{label}</div>
    </motion.div>
  );
}

// Component: Health Metric
function HealthMetric({ label, value }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-gray-400">{label}</span>
        <span className="text-sm font-black text-white">{value}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full ${value > 95 ? 'bg-green-500' : value > 90 ? 'bg-orange-500' : 'bg-red-500'}`}
        />
      </div>
    </div>
  );
}

// Component: Action Button
function ActionButton({ icon: Icon, label, color }: any) {
  const colorMap: any = {
    orange: "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400",
    blue: "hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400",
    purple: "hover:border-purple-500/50 hover:bg-purple-500/5 hover:text-purple-400",
    green: "hover:border-green-500/50 hover:bg-green-500/5 hover:text-green-400",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-center gap-2 px-4 py-3 bg-[#0A0A0A] border border-gray-800 text-gray-300 rounded-xl text-sm font-bold transition-all ${colorMap[color]}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
}

// Component: Job Card
function JobCard({ job, delay }: any) {
  const statusConfig: any = {
    processing: { icon: Loader, color: "orange", bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
    completed: { icon: CheckCircle, color: "green", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
    failed: { icon: XCircle, color: "red", bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400" },
  };

  const config = statusConfig[job.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${config.text} ${job.status === 'processing' ? 'animate-spin' : ''}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{job.document}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>Job ID: {job.id}</span>
                <span>•</span>
                <span>Started: {new Date(job.startedAt).toLocaleTimeString()}</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-lg ${config.bg} ${config.text} border ${config.border} text-xs font-black uppercase`}>
              {job.status}
            </div>
          </div>

          {job.status === 'processing' && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-400">Progress</span>
                <span className="text-sm font-black text-orange-400">{job.progress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                />
              </div>
              {job.estimatedCompletion && (
                <div className="text-xs text-gray-500 mt-2">
                  Est. completion: {new Date(job.estimatedCompletion).toLocaleTimeString()}
                </div>
              )}
            </div>
          )}

          {job.status === 'completed' && job.completedAt && (
            <div className="text-sm text-gray-400 mt-2">
              Completed: {new Date(job.completedAt).toLocaleTimeString()}
            </div>
          )}

          {job.status === 'failed' && job.error && (
            <div className="mt-3 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">{job.error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Component: Health Card
function HealthCard({ icon: Icon, label, value, status, details }: any) {
  const statusColor = value > 95 ? 'green' : value > 90 ? 'orange' : 'red';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-${statusColor}-500/20 border border-${statusColor}-500/30 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${statusColor}-400`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{label}</h3>
          <p className="text-xs text-gray-400">{details}</p>
        </div>
      </div>
      <div className="text-4xl font-black text-white mb-3">{value}%</div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-full bg-gradient-to-r from-${statusColor}-500 to-${statusColor}-600`}
        />
      </div>
    </motion.div>
  );
}

// Component: Resource Metric
function ResourceMetric({ icon: Icon, label, value, color }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 text-${color}-400`} />
        <span className="text-sm font-bold text-gray-400">{label}</span>
      </div>
      <div className="text-2xl font-black text-white mb-2">{value}%</div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600`}
        />
      </div>
    </div>
  );
}

// Component: Audit Row
function AuditRow({ entry, delay }: any) {
  const actionIcons: any = {
    query: Eye,
    compare: GitBranch,
    upload: Upload,
    extract: Database,
  };

  const Icon = actionIcons[entry.action] || Activity;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="border-b border-gray-800 hover:bg-[#2D2D2D] transition-colors"
    >
      <td className="px-6 py-4">
        <div className="text-sm font-mono text-gray-400">
          {new Date(entry.timestamp).toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <span className="text-xs font-bold text-orange-400">{entry.user.split('@')[0].substring(0, 2).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-white">{entry.user.split('@')[0]}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-bold text-white capitalize">{entry.action}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-400 max-w-md truncate">
          {entry.query || entry.document || entry.documentsCompared?.join(' vs ') || '-'}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-xs font-bold text-green-400">Success</span>
        </div>
      </td>
    </motion.tr>
  );
}

// Component: Permission Card
function PermissionCard({ role, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#1A1A1A] border-2 border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{role.role}</h3>
            <p className="text-sm text-gray-400">{role.users} users</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-[#2D2D2D] border border-gray-700 text-gray-300 rounded-lg text-sm font-bold hover:border-orange-500 transition-all"
        >
          Edit
        </motion.button>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-400 mb-3">Access Permissions</h4>
        <div className="flex flex-wrap gap-2">
          {role.access.map((perm: string) => (
            <span key={perm} className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-xs font-bold text-green-400">
              {perm}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#0A0A0A] border border-gray-800 rounded-xl">
        <div className="flex items-start gap-2">
          <Lock className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">{role.restrictions}</p>
        </div>
      </div>
    </motion.div>
  );
}
