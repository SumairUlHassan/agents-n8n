import Link from "next/link";
import { AGENTS_LIST } from "@/config/agents";
import { Zap, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export const metadata = {
  title: "AI Agent Demonstrations | Elixr Co.",
  description: "Explore production-style AI agents connected to visual automation workflows.",
};

export default function AgentDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Zap className="h-5 w-5 fill-indigo-500/30" />
            </div>
            <span className="text-lg font-bold text-white tracking-wide">Elixr Co.</span>
          </div>

          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>10 Live Production Workflows</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            AI Agent Demonstrations
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Explore production-style AI agents connected to visual automation workflows.
          </p>
          <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-indigo-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Elixr Co. builds complete AI agents with transparent, auditable, production-style automation workflows.</span>
          </div>
        </div>

        {/* 10 Compact Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS_LIST.map((agent, index) => (
            <div
              key={agent.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-xl hover:border-indigo-500/50 hover:bg-[#131C33] transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-indigo-400 font-semibold px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-500/20">
                    Agent 0{index + 1}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Activity className="h-3 w-3" />
                    <span>Live</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {agent.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {agent.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {agent.workflowNodes.length} Nodes Workflow
                </span>

                <Link
                  href={`/agents/${agent.slug}`}
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition-all group-hover:translate-x-0.5"
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
      <footer className="border-t border-slate-800/80 bg-[#090D16] py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          © 2026 Elixr Co. All rights reserved. Built with Next.js, React Flow, and Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}
