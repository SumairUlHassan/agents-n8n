import { AgentConfig } from "@/types/agents";

export const sdrAgentConfig: AgentConfig = {
  slug: "sdr",
  title: "AI SDR Agent",
  subtitle: "Finds qualified prospects, researches their businesses, personalizes outreach, handles responses, and books meetings automatically.",
  statusText: "Live — connected to outbound sales pipeline",
  inputType: "hybrid",
  placeholder: "Enter outreach target or company profile...",
  submitLabel: "Start Outreach Demo",
  examplePrompts: [
    "Find SaaS companies in Texas",
    "Research this prospect",
    "Create personalized outreach",
    "Handle an interested reply",
  ],
  fields: [
    { id: "industry", label: "Target Industry", type: "text", placeholder: "e.g. B2B SaaS, FinTech, Healthcare", defaultValue: "B2B SaaS" },
    { id: "location", label: "Target Location", type: "text", placeholder: "e.g. Texas, USA", defaultValue: "Austin, Texas" },
    { id: "companySize", label: "Company Size", type: "select", options: ["1-10 employees", "11-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees"], defaultValue: "51-200 employees" },
    { id: "offer", label: "Offer / Product", type: "textarea", placeholder: "e.g. AI Workflow Automation Platform for Enterprise Sales Teams", defaultValue: "Automated Lead Qualification & CRM Sync Solution" },
    { id: "websiteUrl", label: "Optional Website URL", type: "url", placeholder: "https://example.com" },
    { id: "outreachInstruction", label: "Outreach Instruction", type: "text", placeholder: "Focus on ROI & 40% reduction in manual data entry", defaultValue: "Emphasize 3x conversion lift and automated meeting scheduling" },
  ],
  workflowDescription: "Automated 20-node B2B outbound campaign pipeline running lead discovery, web scraping, ICP scoring, AI personalization, email delivery, and objection handling.",
  trustStatement: "Every lead is researched, scored, personalized, and logged before outreach is generated.",
  metricsLabels: ["Leads Found", "Qualified Leads", "Personalization Score", "Meetings Booked"],
  workflowNodes: [
    { id: "n1", label: "Campaign Trigger", type: "trigger", description: "Receives target criteria & starts outbound workflow", modelOrTool: "Webhook / API", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Validate Target Criteria", type: "action", description: "Validates industry, company size, and location parameters", modelOrTool: "Validation Engine", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Lead Source Search", type: "action", description: "Queries LinkedIn & Apollo databases for matching leads", modelOrTool: "Apollo API / Serper", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Loop Over Leads", type: "action", kind: "code", description: "Splits leads into batches & iterates through each prospect", modelOrTool: "Loop In Batches", position: { x: 560, y: 150 }, targetIds: ["n5"], targetLabels: { "n5": "loop item" } },
    { id: "n5", label: "Website Research", type: "action", kind: "http", description: "Scrapes prospect website for recent news & tech initiatives", modelOrTool: "Firecrawl Scraper", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "ICP Qualification", type: "agent", kind: "code", description: "Evaluates fit against Ideal Customer Profile (0-100 score)", modelOrTool: "Gemini 1.5 Pro", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "IF: Qualified Fit?", type: "decision", kind: "if", description: "Routes lead based on ICP score (>= 75 Qualified)", modelOrTool: "Switch Router", position: { x: 1070, y: 150 }, targetIds: ["n8"], targetLabels: { "n8": "true (fit >= 75)" } },
    { id: "n8", label: "Personalization Agent", type: "agent", kind: "code", description: "Generates custom hook based on recent news & role pain points", modelOrTool: "Gemini Flash AI", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Email Generator", type: "action", kind: "code", description: "Drafts 3-step cold email sequence tailored to prospect", modelOrTool: "Copy Engine", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Compliance Check", type: "action", kind: "code", description: "Checks CAN-SPAM, unsubscribe link & tone guidelines", modelOrTool: "Guardrails API", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "Send Email", type: "action", kind: "http", description: "Dispatches email via Smartlead/Instantly platform", modelOrTool: "SendGrid / SMTP", position: { x: 1750, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Wait for Reply", type: "action", kind: "schedule", description: "Monitors inbox for prospect response", modelOrTool: "Email Poller", position: { x: 1920, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Reply Classification", type: "agent", kind: "code", description: "Classifies incoming reply (Interested, Objection, OOO, Unsubscribe)", modelOrTool: "NLP Classifier", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Switch: Intent Router", type: "decision", kind: "if", description: "Branches based on classification", modelOrTool: "Switch Router", position: { x: 2260, y: 150 }, targetIds: ["n15", "n16"], targetLabels: { "n15": "objection", "n16": "interested" } },
    { id: "n15", label: "Objection Handling", type: "agent", kind: "code", description: "Drafts objection rebuttal addressing pricing/timing", modelOrTool: "Objection AI", position: { x: 2430, y: 70 }, targetIds: ["n18"], targetLabels: { "n18": "rebuttal sent" } },
    { id: "n16", label: "Calendar Availability", type: "action", kind: "http", description: "Checks executive calendar for open demo slots", modelOrTool: "Cal.com API", position: { x: 2430, y: 230 }, targetIds: ["n17"] },
    { id: "n17", label: "Book Meeting", type: "action", kind: "http", description: "Sends calendar invitation & updates meeting schedule", modelOrTool: "Google Calendar", position: { x: 2600, y: 230 }, targetIds: ["n18"] },
    { id: "n18", label: "CRM Update", type: "action", kind: "http", description: "Pushes prospect record, deal stage, and activity log to CRM", modelOrTool: "HubSpot / Salesforce", position: { x: 2770, y: 150 }, targetIds: ["n19"] },
    { id: "n19", label: "Slack Notification", type: "action", description: "Alerts sales team on #sales-alerts channel with lead score", modelOrTool: "Slack Webhook", position: { x: 2940, y: 150 }, targetIds: ["n20"] },
    { id: "n20", label: "Execution Logger", type: "output", description: "Logs full execution details to audit store", modelOrTool: "Logger Service", position: { x: 3110, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "sdr-tx-saas",
      triggerPrompt: "Find SaaS companies in Texas",
      scenarioName: "Texas SaaS Outreach & Meeting Booking",
      outputPayload: {
        prospectName: "Sarah Jenkins",
        title: "VP of Sales Operations",
        company: "ApexFlow Technologies",
        website: "https://apexflow-demo.io",
        qualificationScore: "94/100 (High Fit)",
        personalizedHook: "Noticed ApexFlow's recent Series B funding and expansion into enterprise automation.",
        generatedEmail: `Subject: Quick question re: ApexFlow's sales workflow scaling

Hi Sarah,

Congrats on ApexFlow's recent Series B expansion! Noticed your team is rapidly scaling the Texas enterprise sales team.

Usually, VP of Ops at growing SaaS companies spend 12+ hours weekly manually assigning leads and updating HubSpot. We helped CloudScale automate 100% of lead routing, giving reps 8 hours back weekly.

Would you be open to a 10-min demo this Thursday at 2:00 PM CST to see how it integrates with your stack?

Best regards,
Alex | Elixr Co. Automation`,
        replyClassification: "Interested (High Intent)",
        meetingResult: "Demo Confirmed for Thursday at 2:00 PM CST via Google Meet",
        crmStatus: "HubSpot Deal Created (Stage: Demo Scheduled - $24,000 ARR)",
      },
      metrics: [
        { label: "Leads Found", value: "48" },
        { label: "Qualified Leads", value: "36" },
        { label: "Personalization Score", value: "94%" },
        { label: "Meetings Booked", value: "12" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n16", "n17", "n18", "n19", "n20"],
      skippedNodeIds: ["n15"],
      logs: [
        { nodeId: "n1", nodeName: "Campaign Trigger", event: "Triggered target industry query: SaaS Texas", status: "success", durationMs: 120 },
        { nodeId: "n3", nodeName: "Lead Source Search", event: "Discovered 48 leads matching headcount criteria", status: "success", durationMs: 450 },
        { nodeId: "n6", nodeName: "ICP Qualification", event: "Qualified prospect Sarah Jenkins (ApexFlow) - 94/100", status: "success", durationMs: 620 },
        { nodeId: "n8", nodeName: "Personalization Agent", event: "Generated personalized opening line based on Series B press release", status: "success", durationMs: 510 },
        { nodeId: "n11", nodeName: "Send Email", event: "Outreach email sent via Smartlead SMTP node", status: "success", durationMs: 340 },
        { nodeId: "n13", nodeName: "Reply Classification", event: "Incoming response classified: Interested / Request Demo", status: "success", durationMs: 290 },
        { nodeId: "n17", nodeName: "Book Meeting", event: "Calendar invitation scheduled for Thursday 2:00 PM CST", status: "success", durationMs: 380 },
        { nodeId: "n18", nodeName: "CRM Update", event: "HubSpot Deal updated with stage 'Demo Scheduled'", status: "success", durationMs: 210 },
      ],
      generatedArtifact: {
        type: "email",
        title: "Personalized Outreach Email & Lead Briefing",
        content: `PROSPECT BRIEFING:
• Prospect: Sarah Jenkins (VP of Sales Ops)
• Company: ApexFlow Technologies
• Company Size: 120 employees
• ICP Fit Score: 94/100

GENERATED OUTREACH EMAIL:
Subject: Quick question re: ApexFlow's sales workflow scaling

Hi Sarah,

Congrats on ApexFlow's recent Series B expansion! Noticed your team is rapidly scaling the Texas enterprise sales team.

Usually, VPs of Ops at growing SaaS companies spend 12+ hours weekly manually assigning leads and updating HubSpot. We helped CloudScale automate 100% of lead routing, giving reps 8 hours back weekly.

Would you be open to a 10-min demo this Thursday at 2:00 PM CST to see how it integrates with your stack?

Best regards,
Alex | Elixr Co. Automation`,
        downloadableFormat: "txt",
      },
    },
  ],
};
