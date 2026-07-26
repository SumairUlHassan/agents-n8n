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
    <header className="sticky top-0 z-40 w-full border-b border-[#dde3ea] bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Back link */}
        <div className="flex items-center space-x-4">
          <Link
            href="/agents"
            className="flex items-center space-x-2 text-[#1a2530] transition-colors hover:text-[#1f7ae0]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(31,122,224,0.1)] text-[#1f7ae0] border border-[rgba(31,122,224,0.3)]">
              <Zap className="h-5 w-5 fill-[#1f7ae0]" />
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-[#1a2530]">Elixr Co.</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-[#1f7ae0] border border-[#dde3ea]">
                n8n Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Agent Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 rounded-lg border border-[#dde3ea] bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#1a2530] shadow-sm hover:border-[#1f7ae0] hover:bg-slate-50 transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-[#12946a] animate-pulse" />
            <span className="max-w-[140px] sm:max-w-[220px] truncate">{currentAgent.title}</span>
            <ChevronDown className={`h-4 w-4 text-[#667080] transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 rounded-xl border border-[#dde3ea] bg-white p-2 shadow-2xl z-50">
              <div className="px-3 py-2 text-xs font-semibold text-[#667080] uppercase tracking-wider border-b border-[#dde3ea] mb-1">
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
                        ? "bg-[rgba(31,122,224,0.1)] text-[#1f7ae0] font-semibold border border-[rgba(31,122,224,0.3)]"
                        : "text-[#1a2530] hover:bg-slate-100"
                    }`}
                  >
                    <span className="truncate">{agent.title}</span>
                    <span className="text-[10px] font-mono text-[#667080]">/{agent.slug}</span>
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
            className="hidden md:flex items-center space-x-1 rounded-lg border border-[#dde3ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#1a2530] hover:bg-slate-100 transition-colors"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>All Demos</span>
          </Link>

          <div className="flex items-center space-x-1 border-l border-[#dde3ea] pl-2">
            {prevAgent ? (
              <Link
                href={`/agents/${prevAgent.slug}`}
                title={`Previous: ${prevAgent.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dde3ea] bg-white text-[#667080] hover:border-[#1f7ae0] hover:text-[#1f7ae0] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                <ArrowLeft className="h-4 w-4" />
              </div>
            )}

            {nextAgent ? (
              <Link
                href={`/agents/${nextAgent.slug}`}
                title={`Next: ${nextAgent.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dde3ea] bg-white text-[#667080] hover:border-[#1f7ae0] hover:text-[#1f7ae0] transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
