import { AgentConfig, AgentExecutionResponse, DemoScenario } from "@/types/agents";
import { ExecutionLogEntry } from "@/types/workflows";

export function runSimulationSync(
  agent: AgentConfig,
  promptOrInput: string,
  formValues?: Record<string, string>
): AgentExecutionResponse {
  // Find matching scenario or default to first scenario
  const scenario: DemoScenario =
    agent.demoScenarios.find((s) =>
      s.triggerPrompt.toLowerCase().includes(promptOrInput.toLowerCase()) ||
      promptOrInput.toLowerCase().includes(s.triggerPrompt.toLowerCase())
    ) || agent.demoScenarios[0];

  const now = new Date();
  const formatTime = (d: Date) => d.toTimeString().split(" ")[0];

  const logs: ExecutionLogEntry[] = scenario.logs.map((log, idx) => {
    const timestamp = new Date(now.getTime() + idx * 450);
    return {
      timestamp: formatTime(timestamp),
      nodeId: log.nodeId,
      nodeName: log.nodeName,
      event: log.event,
      status: log.status,
      duration: log.durationMs,
    };
  });

  const nodeExecutions = agent.workflowNodes.map((node) => {
    const isExecuted = scenario.executedNodeIds.includes(node.id);
    const isSkipped = scenario.skippedNodeIds?.includes(node.id);

    return {
      nodeId: node.id,
      status: isSkipped ? ("skipped" as const) : isExecuted ? ("success" as const) : ("idle" as const),
      input: { samplePrompt: promptOrInput, form: formValues },
      output: isExecuted ? { status: "OK", node: node.label } : { status: "Skipped" },
      duration: isExecuted ? Math.floor(Math.random() * 300 + 150) : 0,
    };
  });

  return {
    success: true,
    executionId: `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    agent: agent.slug,
    scenario: scenario.scenarioName,
    message: "Interactive demo execution completed successfully",
    output: scenario.outputPayload,
    metrics: scenario.metrics,
    logs,
    nodeExecutions,
  };
}
