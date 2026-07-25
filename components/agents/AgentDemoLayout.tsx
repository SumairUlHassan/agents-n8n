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

    try {
      // Call real backend API route endpoint
      const apiResponse = await fetch(`/api/agents/${agent.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, formValues }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Server returned HTTP ${apiResponse.status}`);
      }

      const response: AgentExecutionResponse = await apiResponse.json();

      // Step-by-step visual workflow node animation
      const executedNodes = agent.workflowNodes.filter((n) =>
        response.nodeExecutions.some((e) => e.nodeId === n.id && e.status === "success")
      );

      const stepDelay = Math.max(250, Math.floor(3500 / Math.max(1, executedNodes.length)));

      for (let i = 0; i < executedNodes.length; i++) {
        const currentNode = executedNodes[i];
        setActiveNodeId(currentNode.id);

        const matchingLog = response.logs[i] || {
          timestamp: new Date().toTimeString().split(" ")[0],
          nodeId: currentNode.id,
          nodeName: currentNode.label,
          event: `Executing ${currentNode.label} node...`,
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
    } catch (err) {
      console.error("API execution error:", err);
      // Fallback display if network issue occurs
      setLogs((prev) => [
        ...prev,
        {
          timestamp: new Date().toTimeString().split(" ")[0],
          nodeId: "err",
          nodeName: "Error Handler",
          event: `Execution error: ${err instanceof Error ? err.message : "Unknown error"}`,
          status: "failed",
          duration: 0,
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation & Switcher */}
      <AgentSwitcher currentSlug={agent.slug} />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Agent Header */}
        <AgentHeader
          title={agent.title}
          subtitle={agent.subtitle}
          statusText={agent.statusText}
          examplePrompts={agent.examplePrompts}
          onSelectPrompt={handleSelectPrompt}
        />

        {/* Input Panel */}
        <AgentInputPanel
          agent={agent}
          onSubmit={handleExecuteDemo}
          isRunning={isRunning}
          onReset={handleReset}
          selectedPrompt={selectedPrompt}
        />

        {/* React Flow Visual Canvas */}
        <WorkflowPipeline
          workflowNodes={agent.workflowNodes}
          activeNodeId={activeNodeId}
          completedNodeIds={completedNodeIds}
          skippedNodeIds={skippedNodeIds}
          workflowDescription={agent.workflowDescription}
          onSelectNode={(node) => setSelectedNodeDetails(node)}
        />

        {/* Streaming Execution Audit Log */}
        <ExecutionLog logs={logs} />

        {/* Real Server Execution Output & Artifact Preview */}
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

      {/* Node Details Drawer */}
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
            100% Real Server Backend Integration | Next.js API Routes
          </div>
        </div>
      </footer>
    </div>
  );
}
