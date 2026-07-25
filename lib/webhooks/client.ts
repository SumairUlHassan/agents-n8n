import { AgentConfig, AgentExecutionResponse } from "@/types/agents";

const WEBHOOK_ENV_MAP: Record<string, string | undefined> = {
  sdr: process.env.NEXT_PUBLIC_SDR_WEBHOOK_URL,
  support: process.env.NEXT_PUBLIC_SUPPORT_WEBHOOK_URL,
  recruiting: process.env.NEXT_PUBLIC_RECRUITING_WEBHOOK_URL,
  "executive-assistant": process.env.NEXT_PUBLIC_EXECUTIVE_ASSISTANT_WEBHOOK_URL,
  "financial-analyst": process.env.NEXT_PUBLIC_FINANCIAL_ANALYST_WEBHOOK_URL,
  operations: process.env.NEXT_PUBLIC_OPERATIONS_WEBHOOK_URL,
  "proposal-generator": process.env.NEXT_PUBLIC_PROPOSAL_WEBHOOK_URL,
  marketing: process.env.NEXT_PUBLIC_MARKETING_WEBHOOK_URL,
  research: process.env.NEXT_PUBLIC_RESEARCH_WEBHOOK_URL,
  "data-analyst": process.env.NEXT_PUBLIC_DATA_ANALYST_WEBHOOK_URL,
};

export async function executeWebhookIfAvailable(
  agent: AgentConfig,
  inputData: Record<string, unknown>
): Promise<AgentExecutionResponse | null> {
  const webhookUrl = WEBHOOK_ENV_MAP[agent.slug];
  if (!webhookUrl || typeof window !== "undefined" && !webhookUrl.startsWith("http")) {
    return null; // Fallback to simulator
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agent: agent.slug,
        timestamp: new Date().toISOString(),
        input: inputData,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    return {
      success: true,
      executionId: data.executionId || `wh_${Date.now()}`,
      agent: agent.slug,
      scenario: "Live Webhook Execution",
      message: "Successfully executed via live n8n webhook",
      output: data.output || data,
      metrics: data.metrics || [],
      logs: data.logs || [],
      nodeExecutions: data.nodeExecutions || [],
    };
  } catch (error) {
    console.warn(`Webhook failed or timed out for ${agent.slug}, falling back to simulation:`, error);
    return null;
  }
}
