"use client";

import { TrendingUp } from "lucide-react";

interface AgentMetricsProps {
  metrics: Array<{ label: string; value: string | number }>;
}

export function AgentMetrics({ metrics }: AgentMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-slate-800 bg-[#0F172A]/80 p-4 shadow-lg backdrop-blur-sm space-y-1 hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{metric.label}</span>
            <TrendingUp className="h-3.5 w-3.5 text-indigo-400 opacity-70" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-mono text-emerald-400">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
