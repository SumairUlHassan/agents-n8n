"use client";

import { useState } from "react";
import { AgentConfig, AgentExecutionResponse } from "@/types/agents";
import { WorkflowNodeConfig, ExecutionLogEntry } from "@/types/workflows";
import { AgentSwitcher } from "./AgentSwitcher";
import { AgentHeader } from "./AgentHeader";
import { AgentInputPanel } from "./AgentInputPanel";
import { WorkflowPipeline } from "./WorkflowPipeline";
import { ExecutionLog } from "./ExecutionLog";
import { NodeDetailsModal } from "./NodeDetailsModal";
import { AgentOutputPanel } from "./AgentOutputPanel";
import { runSimulationSync } from "@/lib/agent-simulator/engine";
import { executeWebhookIfAvailable } from "@/lib/webhooks/client";

interface AgentDemoLayoutProps {
  agent: AgentConfig;
}

export function AgentDemoLayout({ agent }: AgentDemoLayoutProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(undefined);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [skippedNodeIds, setSkippedNodeIds] = useState<string[]>([]);
  const [logs, setLogs] = useState<ExecutionLogEntry[]>([]);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<WorkflowNodeConfig | null>(null);
  const [executionResult, setExecutionResult] = useState<AgentExecutionResponse | null>(null);

  const handleReset = () => {
    setIsRunning(false);
    setActiveNodeId(undefined);
    setCompletedNodeIds([]);
    setSkippedNodeIds([]);
    setLogs([]);
    setExecutionResult(null);
    setSelectedPrompt("");
  };

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    handleExecuteDemo(prompt);
  };

  const handleExecuteDemo = async (promptText: string, formValues?: Record<string, string>) => {
    if (isRunning) return;

    handleReset();
    setIsRunning(true);

    // Check live webhook first
    const webhookResponse = await executeWebhookIfAvailable(agent, { prompt: promptText, formValues });
    const response = webhookResponse || runSimulationSync(agent, promptText, formValues);

    // Step-by-step animation simulation (4-8 seconds total duration)
    const executedNodes = agent.workflowNodes.filter((n) =>
      response.nodeExecutions.some((e) => e.nodeId === n.id && e.status === "success")
    );

    const stepDelay = Math.max(300, Math.floor(4500 / Math.max(1, executedNodes.length)));

    for (let i = 0; i < executedNodes.length; i++) {
      const currentNode = executedNodes[i];
      setActiveNodeId(currentNode.id);

      // Append log entry
      const matchingLog = response.logs[i] || {
        timestamp: new Date().toTimeString().split(" ")[0],
        nodeId: currentNode.id,
        nodeName: currentNode.label,
        event: `Executing ${currentNode.label} step...`,
        status: "success" as const,
        duration: 250,
      };

      setLogs((prev) => [...prev, matchingLog]);

      await new Promise((resolve) => setTimeout(resolve, stepDelay));
      setCompletedNodeIds((prev) => [...prev, currentNode.id]);
    }

    setActiveNodeId(undefined);
    setSkippedNodeIds(
      response.nodeExecutions
        .filter((e) => e.status === "skipped")
        .map((e) => e.nodeId)
    );
    setExecutionResult(response);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation & Agent Switcher */}
      <AgentSwitcher currentSlug={agent.slug} />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Agent Header (Title, Subtitle, Live Status & Predefined Prompts) */}
        <AgentHeader
          title={agent.title}
          subtitle={agent.subtitle}
          statusText={agent.statusText}
          examplePrompts={agent.examplePrompts}
          onSelectPrompt={handleSelectPrompt}
        />

        {/* Input Panel (Form, Chat, Upload or Hybrid) */}
        <AgentInputPanel
          agent={agent}
          onSubmit={handleExecuteDemo}
          isRunning={isRunning}
          onReset={handleReset}
          selectedPrompt={selectedPrompt}
        />

        {/* Interactive React Flow Workflow Pipeline Canvas */}
        <WorkflowPipeline
          workflowNodes={agent.workflowNodes}
          activeNodeId={activeNodeId}
          completedNodeIds={completedNodeIds}
          skippedNodeIds={skippedNodeIds}
          workflowDescription={agent.workflowDescription}
          onSelectNode={(node) => setSelectedNodeDetails(node)}
        />

        {/* Execution Log Stream */}
        <ExecutionLog logs={logs} />

        {/* Execution Output Panel & Generated Artifact */}
        <AgentOutputPanel
          outputPayload={executionResult?.output}
          metrics={executionResult?.metrics}
          generatedArtifact={
            agent.demoScenarios[0]?.generatedArtifact
          }
          trustStatement={agent.trustStatement}
          isRunning={isRunning}
        />
      </main>

      {/* Node Details Modal Drawer */}
      <NodeDetailsModal
        node={selectedNodeDetails}
        onClose={() => setSelectedNodeDetails(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090D16] py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 <span className="font-semibold text-slate-300">Elixr Co.</span> — Multi-Agent AI Automation Suite
          </div>
          <div className="font-mono text-[11px] text-slate-600">
            Powered by Next.js, React Flow & Gemini 1.5 Pro
          </div>
        </div>
      </footer>
    </div>
  );
}
