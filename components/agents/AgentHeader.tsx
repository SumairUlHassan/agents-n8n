"use client";

import { Sparkles, Terminal } from "lucide-react";

interface AgentHeaderProps {
  title: string;
  subtitle: string;
  statusText: string;
  examplePrompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

export function AgentHeader({
  title,
  subtitle,
  statusText,
  examplePrompts,
  onSelectPrompt,
}: AgentHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a2530] flex items-center gap-2">
            {title}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#667080] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* n8n Live Green Badge */}
        <div className="shrink-0">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[rgba(18,148,106,0.3)] bg-[rgba(18,148,106,0.1)] px-3 py-1 text-xs font-semibold text-[#12946a] shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12946a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12946a]"></span>
            </span>
            <span>{statusText || "● Live — connected to production n8n pipeline"}</span>
          </div>
        </div>
      </div>

      {/* Predefined Prompts Chips */}
      <div className="pt-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#667080] mb-2 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-[#1f7ae0]" />
          <span>Predefined Scenarios / Prompts:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSelectPrompt(prompt)}
              className="inline-flex items-center space-x-1.5 rounded-full border border-[rgba(31,122,224,0.25)] bg-[rgba(31,122,224,0.08)] px-3.5 py-1.5 text-xs font-medium text-[#1f7ae0] hover:bg-[rgba(31,122,224,0.16)] transition-all cursor-pointer shadow-sm group"
            >
              <Terminal className="h-3 w-3 text-[#1f7ae0] group-hover:scale-110 transition-transform" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
