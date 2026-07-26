import { AgentConfig } from "@/types/agents";

export const supportAgentConfig: AgentConfig = {
  slug: "support",
  title: "Omnichannel Customer Support Agent",
  subtitle: "Answers customer questions, searches company knowledge, performs support actions, and escalates uncertain cases.",
  statusText: "Live — connected to support automation pipeline",
  inputType: "chat",
  placeholder: "Ask a customer-support question...",
  submitLabel: "Send",
  examplePrompts: [
    "Reset my password",
    "Track my order",
    "Request a refund",
    "Ask an off-topic question",
  ],
  workflowDescription: "Automated 16-node support pipeline executing channel detection, grounded RAG search, confidence scoring, automated actions, and human escalation.",
  trustStatement: "Every answer is grounded against approved company data, confidence-scored, and logged for audit.",
  metricsLabels: ["Resolution Rate", "Avg Confidence", "KB References", "Escalation Rate"],
  workflowNodes: [
    { id: "n1", label: "Message Trigger", type: "trigger", kind: "trigger", description: "Receives user support inquiry from chat or webhook", modelOrTool: "Chat Gateway", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Channel Detection", type: "action", kind: "http", description: "Identifies channel source (Web Chat, Email, WhatsApp, Slack)", modelOrTool: "Channel Detector", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Switch: Intent Classifier", type: "agent", kind: "if", description: "Classifies intent: Password Reset, Order Track, Refund, Off-Topic", modelOrTool: "Intent Classifier", position: { x: 390, y: 150 }, targetIds: ["n4"], targetLabels: { "n4": "valid intent" } },
    { id: "n4", label: "Customer Lookup", type: "action", kind: "http", description: "Fetches user account status, subscription tier & history", modelOrTool: "CRM / Postgres API", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Loop Over Document Chunks", type: "action", kind: "code", description: "Performs vector semantic search over docs & FAQs", modelOrTool: "Pinecone / pgvector", position: { x: 730, y: 150 }, targetIds: ["n6"], targetLabels: { "n6": "chunk batch" } },
    { id: "n6", label: "Rerank Sources", type: "action", kind: "code", description: "Reranks retrieved context snippets by exact relevance", modelOrTool: "Cohere Rerank", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Confidence Score", type: "agent", kind: "code", description: "Calculates grounding & relevance confidence (0-100%)", modelOrTool: "Evaluator LLM", position: { x: 1070, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "IF: High Confidence?", type: "decision", kind: "if", description: "Routes: High Confidence (>= 80%) vs Low Confidence", modelOrTool: "Threshold Router", position: { x: 1240, y: 150 }, targetIds: ["n9", "n13"], targetLabels: { "n9": "high confidence (>=80%)", "n13": "low confidence / escalate" } },
    { id: "n9", label: "Generate Grounded Answer", type: "agent", kind: "code", description: "Synthesizes precise grounded answer with source citations", modelOrTool: "Gemini 1.5 Pro", position: { x: 1410, y: 70 }, targetIds: ["n10"] },
    { id: "n10", label: "Order Lookup", type: "action", kind: "http", description: "Queries live fulfillment DB for tracking status or invoice", modelOrTool: "Shopify DB API", position: { x: 1580, y: 70 }, targetIds: ["n11"] },
    { id: "n11", label: "Refund Eligibility Check", type: "action", kind: "code", description: "Validates 30-day return policy & item condition", modelOrTool: "Policy Engine", position: { x: 1750, y: 70 }, targetIds: ["n12"] },
    { id: "n12", label: "Account Action", type: "action", kind: "http", description: "Executes password reset token or updates order state", modelOrTool: "Auth0 / Stripe API", position: { x: 1920, y: 70 }, targetIds: ["n14"] },
    { id: "n13", label: "Escalate to Human", type: "agent", kind: "code", description: "Creates Zendesk ticket & notifies Tier-2 support team", modelOrTool: "Zendesk API", position: { x: 1410, y: 250 }, targetIds: ["n14"], targetLabels: { "n14": "ticket created" } },
    { id: "n14", label: "CRM Update", type: "action", kind: "http", description: "Logs interaction history to customer timeline", modelOrTool: "Salesforce CRM", position: { x: 2090, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Ticket Logging", type: "action", kind: "http", description: "Records resolution code & satisfaction metrics", modelOrTool: "Analytics DB", position: { x: 2260, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "Response", type: "output", kind: "trigger", description: "Delivers final response payload to user channel", modelOrTool: "Response API", position: { x: 2430, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "support-order-track",
      triggerPrompt: "Track my order",
      scenarioName: "Automated Order Tracking Lookup",
      outputPayload: {
        groundedAnswer: "Your order #EX-89421 shipped yesterday via FedEx Express (Tracking #940011020088). Estimated delivery: Tomorrow by 3:00 PM.",
        sourceCitations: ["Fulfillment System API", "FedEx Live Status Feed", "Policy KB Section 4.2"],
        confidenceScore: "98%",
        customerInformation: "Verified Account: Premium Tier (ID: USR-49210)",
        actionPerformed: "Fetched FedEx tracking status & updated customer portal badge",
        escalationStatus: "None (Resolved automatically)",
        ticketNumber: "#TK-90821",
      },
      metrics: [
        { label: "Resolution Rate", value: "96.4%" },
        { label: "Avg Confidence", value: "98%" },
        { label: "KB References", value: "3 Sources" },
        { label: "Escalation Rate", value: "3.6%" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n12", "n14", "n15", "n16"],
      skippedNodeIds: ["n11", "n13"],
      logs: [
        { nodeId: "n1", nodeName: "Message Trigger", event: "Received inquiry 'Track my order'", status: "success", durationMs: 40 },
        { nodeId: "n3", nodeName: "Intent Classification", event: "Intent identified: ORDER_STATUS (Confidence 0.99)", status: "success", durationMs: 140 },
        { nodeId: "n5", nodeName: "Knowledge Base Search", event: "Searched vector DB with query 'order tracking policy'", status: "success", durationMs: 220 },
        { nodeId: "n7", nodeName: "Confidence Score", event: "Confidence calculated: 98% (High)", status: "success", durationMs: 180 },
        { nodeId: "n10", nodeName: "Order Lookup", event: "Retrieved tracking #940011020088 from fulfillment DB", status: "success", durationMs: 310 },
        { nodeId: "n16", nodeName: "Response", event: "Delivered response payload to user chat interface", status: "success", durationMs: 90 },
      ],
      generatedArtifact: {
        type: "briefing",
        title: "Customer Support Resolution Summary",
        content: `CUSTOMER SUPPORT SUMMARY:
• Ticket ID: #TK-90821
• User: Premium Tier (USR-49210)
• Channel: Web Chat
• Intent: Order Tracking
• Confidence Score: 98%

RESOLVED ANSWER:
"Your order #EX-89421 shipped yesterday via FedEx Express (Tracking #940011020088). Estimated delivery: Tomorrow by 3:00 PM."

CITATIONS:
1. Fulfillment DB (Order EX-89421)
2. FedEx Live API
3. Knowledge Base Art. #104`,
        downloadableFormat: "txt",
      },
    },
  ],
};
