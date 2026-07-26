"use client";

import { Handle, Position } from "@xyflow/react";
import { WorkflowNodeConfig } from "@/types/workflows";
import { Zap, Code2, Globe, GitBranch, Clock, CheckCircle2, Circle, AlertCircle, XCircle } from "lucide-react";

interface WorkflowNodeProps {
  data: WorkflowNodeConfig & {
    onSelectNode?: (node: WorkflowNodeConfig) => void;
  };
}

export function WorkflowNode({ data }: WorkflowNodeProps) {
  const status = data.status || "idle";

  // Determine n8n kind
  const kind = data.kind || (data.type === "trigger" ? "trigger" : data.type === "decision" ? "if" : data.type === "action" ? "http" : "code");

  const getKindLeftBorder = () => {
    switch (kind) {
      case "trigger":
        return "border-l-[3.5px] border-l-[#ff6b8a]";
      case "code":
        return "border-l-[3.5px] border-l-[#a986ff]";
      case "http":
        return "border-l-[3.5px] border-l-[#4fb3ff]";
      case "if":
        return "border-l-[3.5px] border-l-[#2ecf9a]";
      case "schedule":
        return "border-l-[3.5px] border-l-[#8b98a5]";
      default:
        return "border-l-[3.5px] border-l-[#1f7ae0]";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1f7ae0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1f7ae0]"></span>
          </span>
        );
      case "success":
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#12946a]" />;
      case "warning":
        return <AlertCircle className="h-3.5 w-3.5 text-amber-500" />;
      case "failed":
        return <XCircle className="h-3.5 w-3.5 text-rose-500" />;
      case "skipped":
        return <Circle className="h-2.5 w-2.5 text-slate-400 fill-slate-300" />;
      default:
        return <Circle className="h-2.5 w-2.5 text-slate-300" />;
    }
  };

  const getTypeIcon = () => {
    switch (kind) {
      case "trigger":
        return <Zap className="h-3.5 w-3.5 text-[#ff6b8a]" />;
      case "code":
        return <Code2 className="h-3.5 w-3.5 text-[#a986ff]" />;
      case "http":
        return <Globe className="h-3.5 w-3.5 text-[#4fb3ff]" />;
      case "if":
        return <GitBranch className="h-3.5 w-3.5 text-[#2ecf9a]" />;
      case "schedule":
        return <Clock className="h-3.5 w-3.5 text-[#8b98a5]" />;
      default:
        return <Zap className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case "active":
        return "border-[#1f7ae0] ring-2 ring-[#1f7ae0]/40 shadow-[0_0_16px_rgba(31,122,224,0.3)] bg-white";
      case "success":
        return "border-[#12946a] bg-[#e8fbf3]";
      case "warning":
        return "border-amber-400 bg-amber-50/50";
      case "failed":
        return "border-rose-400 bg-rose-50/50";
      case "skipped":
        return "border-slate-200 bg-slate-50 opacity-60";
      default:
        return "border-[#dde3ea] bg-white hover:border-[#1f7ae0]/60 hover:shadow-md";
    }
  };

  return (
    <div
      onClick={() => data.onSelectNode && data.onSelectNode(data)}
      className={`group relative w-[150px] min-h-[46px] rounded-[10px] border p-2 shadow-sm transition-all cursor-pointer select-none ${getKindLeftBorder()} ${getStatusStyles()}`}
    >
      {/* Real n8n Left Connector Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-white !border-2 !border-[#94a3b8] !-left-1.5 hover:!border-[#1f7ae0] transition-all shadow-sm"
      />

      <div className="flex items-start justify-between gap-1">
        <div className="flex items-center space-x-1.5 overflow-hidden">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-100/90 border border-slate-200">
            {getTypeIcon()}
          </div>
          <div className="font-semibold text-[11.5px] text-[#1a2530] leading-tight truncate">
            {data.label}
          </div>
        </div>

        <div className="shrink-0 mt-0.5">{getStatusBadge()}</div>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-slate-200/80 pt-1 text-[9.5px]">
        <span className="font-mono text-[#667080] truncate max-w-[95px]">
          {data.modelOrTool}
        </span>
        <span className="uppercase text-[#667080] font-mono text-[9px] font-semibold">
          {kind}
        </span>
      </div>

      {/* Real n8n Right Connector Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-white !border-2 !border-[#94a3b8] !-right-1.5 hover:!border-[#1f7ae0] transition-all shadow-sm"
      />
    </div>
  );
}
