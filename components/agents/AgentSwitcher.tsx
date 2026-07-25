"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AGENTS_LIST } from "@/config/agents";
import { ChevronDown, ArrowLeft, ArrowRight, LayoutGrid, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function AgentSwitcher({ currentSlug }: { currentSlug?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentIndex = AGENTS_LIST.findIndex((a) => a.slug === currentSlug);
  const currentAgent = AGENTS_LIST[currentIndex] || AGENTS_LIST[0];

  const prevAgent = currentIndex > 0 ? AGENTS_LIST[currentIndex - 1] : null;
  const nextAgent = currentIndex < AGENTS_LIST.length - 1 ? AGENTS_LIST[currentIndex + 1] : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Back link */}
        <div className="flex items-center space-x-4">
          <Link
            href="/agents"
            className="flex items-center space-x-2 text-slate-300 transition-colors hover:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Zap className="h-5 w-5 fill-indigo-500/30" />
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-white">Elixr Co.</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-indigo-400 border border-indigo-500/20">
                AI Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Agent Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 rounded-lg border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-200 shadow-sm hover:border-slate-600 hover:bg-slate-800 transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="max-w-[140px] sm:max-w-[220px] truncate">{currentAgent.title}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 rounded-xl border border-slate-800 bg-[#0F172A] p-2 shadow-2xl z-50">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                Select AI Agent Demo
              </div>
              <div className="max-h-72 overflow-y-auto space-y-0.5">
                {AGENTS_LIST.map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/agents/${agent.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm transition-colors ${
                      agent.slug === currentSlug
                        ? "bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{agent.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">/{agent.slug}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center space-x-2">
          <Link
            href="/agents"
            className="hidden md:flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>All Agents</span>
          </Link>

          <div className="flex items-center space-x-1 border-l border-slate-800 pl-2">
            {prevAgent ? (
              <Link
                href={`/agents/${prevAgent.slug}`}
                title={`Previous: ${prevAgent.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900 bg-slate-950 text-slate-700 opacity-40 cursor-not-allowed">
                <ArrowLeft className="h-4 w-4" />
              </div>
            )}

            {nextAgent ? (
              <Link
                href={`/agents/${nextAgent.slug}`}
                title={`Next: ${nextAgent.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900 bg-slate-950 text-slate-700 opacity-40 cursor-not-allowed">
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
