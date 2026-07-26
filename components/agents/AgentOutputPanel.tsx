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
      <div className="rounded-2xl border border-[rgba(31,122,224,0.3)] bg-white p-6 text-center shadow-sm space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(31,122,224,0.1)] text-[#1f7ae0] border border-[rgba(31,122,224,0.3)] animate-pulse">
          <Sparkles className="h-6 w-6 animate-spin" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#1a2530]">Agent Execution In Progress...</h3>
          <p className="text-xs text-[#667080] mt-1">
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
      <div className="rounded-2xl border border-[#dde3ea] bg-white p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#dde3ea] pb-3">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-[#12946a]" />
            <h3 className="text-sm font-bold text-[#1a2530] uppercase tracking-wider">
              Agent Execution Output
            </h3>
          </div>
          <span className="text-xs font-mono text-[#12946a] bg-[rgba(18,148,106,0.1)] border border-[rgba(18,148,106,0.3)] px-2.5 py-0.5 rounded-full font-semibold">
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
                className="rounded-xl border border-[#dde3ea] bg-[#f4f6f9] p-3 space-y-1 hover:border-[#1f7ae0]/50 transition-colors"
              >
                <div className="font-mono text-[11px] text-[#1f7ae0] uppercase tracking-wider font-semibold">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="text-[#1a2530] font-sans leading-relaxed">
                  {Array.isArray(val) ? (
                    <ul className="list-disc list-inside space-y-0.5 mt-1">
                      {val.map((item, idx) => (
                        <li key={idx} className="text-[#1a2530]">
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
      <div className="rounded-xl border border-[#dde3ea] bg-white p-4 text-center shadow-sm">
        <div className="inline-flex items-center space-x-2 text-xs text-[#667080]">
          <ShieldCheck className="h-4 w-4 text-[#1f7ae0] shrink-0" />
          <span>{trustStatement}</span>
        </div>
      </div>
    </div>
  );
}
