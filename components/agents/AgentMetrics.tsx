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
          className="rounded-xl border border-[#dde3ea] bg-white p-4 shadow-sm space-y-1 hover:border-[#1f7ae0]/50 transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-[#667080]">
            <span>{metric.label}</span>
            <TrendingUp className="h-3.5 w-3.5 text-[#1f7ae0] opacity-70" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#12946a] tracking-tight font-mono">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
