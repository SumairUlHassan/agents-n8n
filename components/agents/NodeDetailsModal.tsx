"use client";

import { WorkflowNodeConfig } from "@/types/workflows";
import { X, Clock, Cpu, FileJson, Info } from "lucide-react";

interface NodeDetailsModalProps {
  node: WorkflowNodeConfig | null;
  onClose: () => void;
}

export function NodeDetailsModal({ node, onClose }: NodeDetailsModalProps) {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-[#dde3ea] bg-white p-6 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#dde3ea] pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[rgba(31,122,224,0.1)] text-[#1f7ae0] border border-[rgba(31,122,224,0.3)] uppercase font-semibold">
                {node.kind || node.type} Node
              </span>
              <span className="text-xs font-mono text-[#667080]">ID: {node.id}</span>
            </div>
            <h3 className="text-lg font-bold text-[#1a2530] mt-1">{node.label}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#667080] hover:bg-slate-100 hover:text-[#1a2530] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Node Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-[#dde3ea] bg-[#f4f6f9] p-3 space-y-1">
            <div className="text-[#667080] flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-[#1f7ae0]" />
              <span>Model / Tool</span>
            </div>
            <div className="font-mono font-semibold text-[#1a2530] truncate">
              {node.modelOrTool}
            </div>
          </div>

          <div className="rounded-lg border border-[#dde3ea] bg-[#f4f6f9] p-3 space-y-1">
            <div className="text-[#667080] flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#12946a]" />
              <span>Execution Duration</span>
            </div>
            <div className="font-mono font-semibold text-[#12946a]">
              {node.status === "success" ? "340ms" : node.status === "active" ? "Running..." : "Idle / Skipped"}
            </div>
          </div>
        </div>

        {/* Node Explanation */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-[#1a2530] flex items-center gap-1">
            <Info className="h-3.5 w-3.5 text-[#1f7ae0]" />
            <span>Operational Function:</span>
          </div>
          <p className="text-xs text-[#667080] leading-relaxed bg-[#f4f6f9] p-3 rounded-lg border border-[#dde3ea]">
            {node.description}
          </p>
        </div>

        {/* Sample Payload Data */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-[#1a2530] flex items-center gap-1">
            <FileJson className="h-3.5 w-3.5 text-amber-500" />
            <span>Sample Node Output Data:</span>
          </div>
          <pre className="max-h-36 overflow-y-auto rounded-lg border border-[#dde3ea] bg-[#f4f6f9] p-3 font-mono text-[11px] text-[#1f7ae0]">
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
            className="rounded-lg bg-[#1f7ae0] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1864b8] transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
