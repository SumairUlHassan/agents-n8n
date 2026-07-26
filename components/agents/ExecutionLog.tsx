"use client";

import { ExecutionLogEntry } from "@/types/workflows";
import { Terminal, CheckCircle2, Clock, AlertTriangle, XCircle, MinusCircle } from "lucide-react";

interface ExecutionLogProps {
  logs: ExecutionLogEntry[];
}

export function ExecutionLog({ logs }: ExecutionLogProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-3 w-3 text-[#12946a] shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />;
      case "failed":
        return <XCircle className="h-3 w-3 text-[#d64545] shrink-0" />;
      case "skipped":
        return <MinusCircle className="h-3 w-3 text-slate-400 shrink-0" />;
      default:
        return <Clock className="h-3 w-3 text-[#1f7ae0] shrink-0 animate-spin" />;
    }
  };

  return (
    <div className="rounded-2xl border border-[#dde3ea] bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-[#dde3ea] pb-2.5">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-[#1f7ae0]" />
          <h3 className="text-xs font-bold text-[#1a2530] uppercase tracking-wider">
            Execution Log Audit Stream
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#667080]">
          {logs.length} entries recorded
        </span>
      </div>

      <div className="max-h-52 overflow-y-auto space-y-1.5 font-mono text-xs pr-1">
        {logs.length === 0 ? (
          <div className="py-6 text-center text-[#667080] text-xs italic">
            No execution logs yet. Trigger a demo scenario above to stream execution steps.
          </div>
        ) : (
          logs.map((log, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-[#dde3ea] bg-[#f4f6f9] px-3 py-1.5 text-[11px] hover:border-[#1f7ae0]/50 transition-colors"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <span className="text-[#667080] shrink-0">{log.timestamp}</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-[#1f7ae0] shrink-0">
                  {log.nodeName}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[#1a2530] truncate">{log.event}</span>
              </div>

              <div className="flex items-center space-x-2 shrink-0 ml-2">
                <span className="text-[10px] text-[#667080]">{log.duration ? `${log.duration}ms` : ""}</span>
                {getStatusIcon(log.status)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
