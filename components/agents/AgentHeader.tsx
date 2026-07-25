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
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {title}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Live Indicator */}
        <div className="shrink-0">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{statusText}</span>
          </div>
        </div>
      </div>

      {/* Example Prompt Buttons */}
      <div className="pt-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Predefined Scenarios / Prompts:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSelectPrompt(prompt)}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-950/30 hover:text-indigo-300 transition-all cursor-pointer shadow-sm group"
            >
              <Terminal className="h-3 w-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
