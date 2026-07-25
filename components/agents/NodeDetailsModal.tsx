"use client";

import { WorkflowNodeConfig } from "@/types/workflows";
import { X, CheckCircle2, Clock, Cpu, FileJson, Info } from "lucide-react";

interface NodeDetailsModalProps {
  node: WorkflowNodeConfig | null;
  onClose: () => void;
}

export function NodeDetailsModal({ node, onClose }: NodeDetailsModalProps) {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-400 border border-indigo-500/30 uppercase">
                {node.type} Node
              </span>
              <span className="text-xs font-mono text-slate-400">ID: {node.id}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{node.label}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Node Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 space-y-1">
            <div className="text-slate-400 flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              <span>Model / Tool</span>
            </div>
            <div className="font-mono font-semibold text-white truncate">
              {node.modelOrTool}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 space-y-1">
            <div className="text-slate-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Execution Duration</span>
            </div>
            <div className="font-mono font-semibold text-emerald-400">
              {node.status === "success" ? "340ms" : node.status === "active" ? "Running..." : "Idle / Skipped"}
            </div>
          </div>
        </div>

        {/* Node Explanation */}
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-slate-300 flex items-center gap-1">
            <Info className="h-3.5 w-3.5 text-cyan-400" />
            <span>Operational Function:</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            {node.description}
          </p>
        </div>

        {/* Sample Payload Data */}
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-slate-300 flex items-center gap-1">
            <FileJson className="h-3.5 w-3.5 text-amber-400" />
            <span>Sample Node Output Data:</span>
          </div>
          <pre className="max-h-36 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-indigo-300">
            {JSON.stringify(
              node.outputSample || {
                nodeId: node.id,
                label: node.label,
                status: node.status || "success",
                timestamp: new Date().toISOString(),
                executedBy: node.modelOrTool,
              },
              null,
              2
            )}
          </pre>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
