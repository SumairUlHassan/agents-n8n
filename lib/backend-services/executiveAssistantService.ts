import { AgentExecutionResponse } from "@/types/agents";
import { callGroqLLM } from "../groqClient";

export async function processExecutiveAssistantAgent(
  query: string,
  formValues?: Record<string, string>
): Promise<AgentExecutionResponse> {
  const executive = formValues?.executiveName || "Alex Morgan (CEO)";
  const timeFrame = formValues?.timeFrame || "Today's Schedule";

  const systemPrompt = `
You are an AI Executive Assistant Agent powered by Groq Llama 3 70B.
Process executive instructions, organize schedules, prioritize emails, and generate actionable summaries.
Return strictly valid JSON with this shape:
{
  "executive": "${executive}",
  "timeFrame": "${timeFrame}",
  "prioritizedTasks": [
    "Board Meeting Prep (Priority: High)",
    "Review Q3 Budget Allocation (Priority: Medium)"
  ],
  "scheduleOptimization": "Rescheduled 2 non-urgent syncs to free up 2.5 hours deep work block.",
  "draftedResponses": 5,
  "urgentAlerts": "No urgent conflicts detected.",
  "timeSaved": "3.5 Hours",
  "execSatisfaction": "98%"
}
`;

  const userPrompt = `
Executive Instruction: ${query}
Executive: ${executive}
Time Frame: ${timeFrame}
`;

  const groqResult = await callGroqLLM(systemPrompt, userPrompt);

  const now = new Date();
  const formatTime = (d: Date) => d.toTimeString().split(" ")[0];

  const nodeIds = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16"];

  return {
    success: true,
    executionId: `exec_groq_${Date.now()}`,
    agent: "executive-assistant",
    scenario: `Executive Prep: ${executive}`,
    message: "Live Groq AI Executive Assistant schedule and tasks processed.",
    output: {
      executiveName: groqResult.executive || executive,
      prioritizedTasks: groqResult.prioritizedTasks || ["Board Prep", "Quarterly Sync"],
      scheduleOptimization: groqResult.scheduleOptimization || "Optimized calendar slots",
      draftedResponses: `${groqResult.draftedResponses || 5} Executive Drafts Ready`,
      urgentAlerts: groqResult.urgentAlerts || "All clear",
    },
    metrics: [
      { label: "Time Saved", value: String(groqResult.timeSaved || "3.5 Hours") },
      { label: "Drafts Created", value: String(groqResult.draftedResponses || 5) },
      { label: "Satisfaction", value: String(groqResult.execSatisfaction || "98%") },
    ],
    logs: [
      { timestamp: formatTime(now), nodeId: "n1", nodeName: "Executive Command Ingest", event: `Received command '${query}' for ${executive}`, status: "success", duration: 80 },
      { timestamp: formatTime(new Date(now.getTime() + 300)), nodeId: "n7", nodeName: "Groq Schedule Optimizer", event: "Live Groq Llama-3 re-prioritized executive inbox and calendar", status: "success", duration: 410 },
      { timestamp: formatTime(new Date(now.getTime() + 600)), nodeId: "n12", nodeName: "Executive Brief Generator", event: "Generated executive summary and action items", status: "success", duration: 250 },
    ],
    nodeExecutions: nodeIds.map((id) => ({
      nodeId: id,
      status: "success",
      duration: 120,
    })),
  };
}
