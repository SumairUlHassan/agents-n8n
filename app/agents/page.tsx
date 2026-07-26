import Link from "next/link";
import { AGENTS_LIST } from "@/config/agents";
import { Zap, ArrowRight, ShieldCheck, Activity, Cpu } from "lucide-react";

export const metadata = {
  title: "AI Automation Demos | Elixr Co.",
  description: "Live, production-connected demos — not mockups. Each one calls a real n8n pipeline.",
};

export default function AgentDirectoryPage() {
  const regularAgents = AGENTS_LIST.filter((a) => a.slug !== "business-command-center");
  const commandCenterAgent = AGENTS_LIST.find((a) => a.slug === "business-command-center");

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
            <span>11 Live n8n Workflows</span>
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

        {/* 10 Specialized Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularAgents.map((agent, index) => (
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

        {/* AI Business Command Center Card (At the Bottom of All Agents) */}
        {commandCenterAgent && (
          <div className="pt-4">
            <div className="group relative flex flex-col md:flex-row items-stretch justify-between rounded-2xl border-2 border-[#1f7ae0]/60 bg-gradient-to-br from-white via-white to-[#f0f7ff] p-7 shadow-md hover:border-[#1f7ae0] hover:shadow-xl transition-all duration-300 gap-6">
              <div className="space-y-4 max-w-3xl flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-[#1f7ae0] font-bold px-3 py-1 rounded-md bg-[rgba(31,122,224,0.12)] border border-[rgba(31,122,224,0.3)] flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-[#1f7ae0]" />
                    <span>Agent 01</span>
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#12946a] bg-[rgba(18,148,106,0.1)] px-3 py-1 rounded-full border border-[rgba(18,148,106,0.3)]">
                    <Activity className="h-3.5 w-3.5" />
                    <span>Live</span>
                  </div>
                  <span className="text-xs font-mono text-[#667080] font-semibold bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    Master Supervisor Orchestrator
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#1a2530] group-hover:text-[#1f7ae0] transition-colors flex items-center gap-2">
                    {commandCenterAgent.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#1f7ae0]">
                    {commandCenterAgent.subtitle}
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#475569] leading-relaxed">
                    A single autonomous agent that handles sales, customer support, recruitment, operations, marketing, finance, research, proposals, executive assistance, and data analysis from one unified workspace.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="bg-white/80 border border-[#dde3ea] p-2.5 rounded-lg shadow-2xs">
                    <span className="text-[#667080] block text-[10px]">Sales & Outbound</span>
                    <span className="font-semibold text-[#1a2530]">Prospects & Booking</span>
                  </div>
                  <div className="bg-white/80 border border-[#dde3ea] p-2.5 rounded-lg shadow-2xs">
                    <span className="text-[#667080] block text-[10px]">Support & HR</span>
                    <span className="font-semibold text-[#1a2530]">RAG Docs & Screening</span>
                  </div>
                  <div className="bg-white/80 border border-[#dde3ea] p-2.5 rounded-lg shadow-2xs">
                    <span className="text-[#667080] block text-[10px]">Finance & Ops</span>
                    <span className="font-semibold text-[#1a2530]">Audits & SLA Reroute</span>
                  </div>
                  <div className="bg-white/80 border border-[#dde3ea] p-2.5 rounded-lg shadow-2xs">
                    <span className="text-[#667080] block text-[10px]">Research & Marketing</span>
                    <span className="font-semibold text-[#1a2530]">Proposals & Analytics</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-[#dde3ea] pt-5 md:pt-0 md:pl-7 shrink-0 min-w-[200px]">
                <div className="space-y-1 text-left md:text-right">
                  <span className="text-2xl font-extrabold text-[#1a2530] block font-mono">
                    180+ Nodes
                  </span>
                  <span className="text-xs text-[#667080] block">
                    Connected Pipeline
                  </span>
                </div>

                <Link
                  href={`/agents/${commandCenterAgent.slug}`}
                  className="mt-6 md:mt-0 w-full md:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#1f7ae0] hover:bg-[#1864b8] px-6 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all group-hover:scale-105"
                >
                  <span>Open Command Center</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
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
