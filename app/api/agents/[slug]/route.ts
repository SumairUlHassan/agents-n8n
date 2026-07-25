import { NextRequest, NextResponse } from "next/server";
import { getAgentBySlug } from "@/config/agents";
import { executeWebhookIfAvailable } from "@/lib/webhooks/client";

// Import 10 real backend processing services
import { processSdrAgent } from "@/lib/backend-services/sdrService";
import { processSupportAgent } from "@/lib/backend-services/supportService";
import { processRecruitingAgent } from "@/lib/backend-services/recruitingService";
import { processExecutiveAssistantAgent } from "@/lib/backend-services/executiveAssistantService";
import { processFinancialAnalystAgent } from "@/lib/backend-services/financialAnalystService";
import { processOperationsAgent } from "@/lib/backend-services/operationsService";
import { processProposalGeneratorAgent } from "@/lib/backend-services/proposalGeneratorService";
import { processMarketingAgent } from "@/lib/backend-services/marketingService";
import { processResearchAgent } from "@/lib/backend-services/researchService";
import { processDataAnalystAgent } from "@/lib/backend-services/dataAnalystService";

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
    const queryText = body.prompt || body.query || agent.examplePrompts[0] || "Execute Agent Task";
    const formValues = body.formValues || body.fields || {};

    // 1. Check if a live n8n webhook URL is configured via environment variables
    const webhookRes = await executeWebhookIfAvailable(agent, { prompt: queryText, formValues });
    if (webhookRes) {
      return NextResponse.json(webhookRes);
    }

    // 2. Otherwise execute full 100% functional server-side backend logic for the target agent
    let response;
    switch (slug) {
      case "sdr":
        response = await processSdrAgent(queryText, formValues);
        break;
      case "support":
        response = await processSupportAgent(queryText, formValues);
        break;
      case "recruiting":
        response = await processRecruitingAgent(queryText, formValues);
        break;
      case "executive-assistant":
        response = await processExecutiveAssistantAgent(queryText, formValues);
        break;
      case "financial-analyst":
        response = await processFinancialAnalystAgent(queryText, formValues);
        break;
      case "operations":
        response = await processOperationsAgent(queryText, formValues);
        break;
      case "proposal-generator":
        response = await processProposalGeneratorAgent(queryText, formValues);
        break;
      case "marketing":
        response = await processMarketingAgent(queryText, formValues);
        break;
      case "research":
        response = await processResearchAgent(queryText, formValues);
        break;
      case "data-analyst":
        response = await processDataAnalystAgent(queryText, formValues);
        break;
      default:
        return NextResponse.json({ success: false, error: "Unsupported agent service" }, { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Backend agent API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Backend agent execution failed",
        message: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
