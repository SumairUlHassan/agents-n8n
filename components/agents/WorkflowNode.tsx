"use client";

import { Handle, Position } from "@xyflow/react";
import { WorkflowNodeConfig } from "@/types/workflows";
import { Zap, Bot, GitBranch, CheckCircle2, Circle, AlertCircle, XCircle, ArrowRight } from "lucide-react";

interface WorkflowNodeProps {
  data: WorkflowNodeConfig & {
    onSelectNode?: (node: WorkflowNodeConfig) => void;
  };
}

export function WorkflowNode({ data }: WorkflowNodeProps) {
  const status = data.status || "idle";

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
        );
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-400" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-rose-400" />;
      case "skipped":
        return <Circle className="h-3 w-3 text-slate-600 fill-slate-700" />;
      default:
        return <Circle className="h-3 w-3 text-slate-600" />;
    }
  };

  const getTypeIcon = () => {
    switch (data.type) {
      case "trigger":
        return <Zap className="h-3.5 w-3.5 text-amber-400" />;
      case "agent":
        return <Bot className="h-3.5 w-3.5 text-indigo-400" />;
      case "decision":
        return <GitBranch className="h-3.5 w-3.5 text-cyan-400" />;
      case "output":
        return <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />;
      default:
        return <Zap className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "active":
        return "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] ring-1 ring-indigo-500";
      case "success":
        return "border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      case "warning":
        return "border-amber-500/60";
      case "failed":
        return "border-rose-500/60";
      case "skipped":
        return "border-slate-800 opacity-50";
      default:
        return "border-slate-800 hover:border-slate-700";
    }
  };

  return (
    <div
      onClick={() => data.onSelectNode && data.onSelectNode(data)}
      className={`group relative min-w-[180px] max-w-[220px] rounded-xl border bg-[#0F172A] p-3 shadow-lg transition-all cursor-pointer ${getBorderColor()}`}
    >
      {/* React Flow Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-slate-700 !w-2.5 !h-2.5 !border-slate-900"
      />

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-900 border border-slate-800">
            {getTypeIcon()}
          </div>
          <div className="font-semibold text-xs text-white truncate max-w-[120px]">
            {data.label}
          </div>
        </div>

        <div className="shrink-0 mt-0.5">{getStatusBadge()}</div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px]">
        <span className="font-mono text-slate-400 truncate max-w-[120px]">
          {data.modelOrTool}
        </span>
        <span className="capitalize text-slate-500 font-mono text-[9px]">
          {data.type}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-slate-700 !w-2.5 !h-2.5 !border-slate-900"
      />
    </div>
  );
}
