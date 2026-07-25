import { NextRequest, NextResponse } from "next/server";
import { getAgentBySlug } from "@/config/agents";
import { runSimulationSync } from "@/lib/agent-simulator/engine";
import { executeWebhookIfAvailable } from "@/lib/webhooks/client";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const agent = getAgentBySlug(slug);

    if (!agent) {
      return NextResponse.json(
        { success: false, error: `Agent '${slug}' not found.` },
        { status: 404 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const promptText = body.prompt || body.query || agent.examplePrompts[0] || "Run Demo";
    const formValues = body.formValues || body.fields;

    // Check webhook first, fallback to simulation
    const webhookRes = await executeWebhookIfAvailable(agent, { prompt: promptText, formValues });
    const response = webhookRes || runSimulationSync(agent, promptText, formValues);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Agent API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Execution failed",
        message: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
