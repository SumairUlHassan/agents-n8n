"use client";

import { AgentMetrics } from "./AgentMetrics";
import { ArtifactPreview } from "./ArtifactPreview";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface AgentOutputPanelProps {
  outputPayload?: Record<string, unknown>;
  metrics?: Array<{ label: string; value: string | number }>;
  generatedArtifact?: {
    type: string;
    title: string;
    content: string;
    downloadableFormat?: string;
  };
  trustStatement: string;
  isRunning: boolean;
}

export function AgentOutputPanel({
  outputPayload,
  metrics,
  generatedArtifact,
  trustStatement,
  isRunning,
}: AgentOutputPanelProps) {
  if (isRunning) {
    return (
      <div className="rounded-2xl border border-indigo-500/30 bg-[#0F172A]/90 p-6 text-center shadow-xl backdrop-blur-md space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 animate-pulse">
          <Sparkles className="h-6 w-6 animate-spin" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Agent Execution In Progress...</h3>
          <p className="text-xs text-slate-400 mt-1">
            Running multi-step visual workflow pipeline and generating output artifacts.
          </p>
        </div>
      </div>
    );
  }

  if (!outputPayload) return null;

  return (
    <div className="space-y-5">
      {/* Metrics Section */}
      {metrics && metrics.length > 0 && <AgentMetrics metrics={metrics} />}

      {/* Main Output Cards Container */}
      <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Agent Execution Output
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            Completed (200 OK)
          </span>
        </div>

        {/* Formatted Key Value Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {Object.entries(outputPayload).map(([key, val]) => {
            if (typeof val === "object" && val !== null && !Array.isArray(val)) return null;

            return (
              <div
                key={key}
                className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 space-y-1 hover:border-slate-700 transition-colors"
              >
                <div className="font-mono text-[11px] text-indigo-400 uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="text-slate-200 font-sans leading-relaxed">
                  {Array.isArray(val) ? (
                    <ul className="list-disc list-inside space-y-0.5 mt-1">
                      {val.map((item, idx) => (
                        <li key={idx} className="text-slate-300">
                          {String(item)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    String(val)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Business Artifact Preview */}
      {generatedArtifact && <ArtifactPreview artifact={generatedArtifact} />}

      {/* Final Trust Statement */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>{trustStatement}</span>
        </div>
      </div>
    </div>
  );
}
