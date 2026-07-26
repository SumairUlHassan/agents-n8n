import Link from "next/link";
import { AGENTS_LIST } from "@/config/agents";
import { Zap, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export const metadata = {
  title: "AI Automation Demos | Elixr Co.",
  description: "Live, production-connected demos — not mockups. Each one calls a real n8n pipeline.",
};

export default function AgentDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#1a2530] flex flex-col font-sans selection:bg-[#1f7ae0] selection:text-white">
      {/* Navbar */}
      <header className="border-b border-[#dde3ea] bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(31,122,224,0.1)] text-[#1f7ae0] border border-[rgba(31,122,224,0.3)]">
              <Zap className="h-5 w-5 fill-[#1f7ae0]" />
            </div>
            <span className="text-lg font-bold text-[#1a2530] tracking-wide">Elixr Co.</span>
          </div>

          <div className="inline-flex items-center space-x-2 rounded-full border border-[rgba(18,148,106,0.3)] bg-[rgba(18,148,106,0.1)] px-3 py-1 text-xs text-[#12946a] font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#12946a] animate-pulse" />
            <span>10 Live n8n Workflows</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1a2530]">
            AI Automation Demos
          </h1>
          <p className="text-base sm:text-lg text-[#667080] leading-relaxed">
            Live, production-connected demos — not mockups. Each one calls a real n8n pipeline.
          </p>
          <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-[#1f7ae0] font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>Elixr Co. builds complete AI agents with transparent, auditable, production-style automation workflows.</span>
          </div>
        </div>

        {/* 10 Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS_LIST.map((agent, index) => (
            <div
              key={agent.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#dde3ea] bg-white p-6 shadow-sm hover:border-[#1f7ae0] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#1f7ae0] font-bold px-2.5 py-1 rounded-md bg-[rgba(31,122,224,0.08)] border border-[rgba(31,122,224,0.25)]">
                    Agent 0{index + 1}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-[#12946a] bg-[rgba(18,148,106,0.1)] px-2 py-0.5 rounded-full border border-[rgba(18,148,106,0.3)]">
                    <Activity className="h-3 w-3" />
                    <span>Live</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1a2530] group-hover:text-[#1f7ae0] transition-colors">
                    {agent.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#667080] leading-relaxed line-clamp-3">
                    {agent.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dde3ea] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#667080]">
                  {agent.workflowNodes.length} Nodes Pipeline
                </span>

                <Link
                  href={`/agents/${agent.slug}`}
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-[#1f7ae0] hover:bg-[#1864b8] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all group-hover:translate-x-0.5"
                >
                  <span>Open Demo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dde3ea] bg-white py-6 text-center text-xs text-[#667080]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          © 2026 Elixr Co. All rights reserved. Built with Next.js, React Flow, and Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}
