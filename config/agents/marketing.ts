import { AgentConfig } from "@/types/agents";

export const marketingAgentConfig: AgentConfig = {
  slug: "marketing",
  title: "AI Marketing Agent",
  subtitle: "Researches markets, creates campaigns, generates content, and evaluates marketing performance.",
  statusText: "Live — connected to marketing automation pipeline",
  inputType: "form",
  placeholder: "Describe campaign objective or paste product brief...",
  submitLabel: "Build Campaign",
  examplePrompts: [
    "Create a LinkedIn campaign",
    "Analyze three competitors",
    "Generate a monthly content plan",
    "Improve this advertisement",
  ],
  fields: [
    { id: "businessDescription", label: "Business Description", type: "textarea", placeholder: "Describe your product/service...", defaultValue: "Enterprise B2B SaaS platform offering automated multi-agent workflows for sales and support." },
    { id: "targetAudience", label: "Target Audience", type: "text", placeholder: "e.g. VPs of Sales, CTOs, Operations Managers", defaultValue: "VPs of Sales Operations & Operations Directors in SaaS (50-500 EEs)" },
    { id: "campaignObjective", label: "Campaign Objective", type: "select", options: ["Lead Generation & Demos", "Brand Awareness", "Product Launch Announcement", "Customer Retention"], defaultValue: "Lead Generation & Demos" },
    { id: "platform", label: "Primary Platform", type: "select", options: ["LinkedIn", "Twitter / X", "Instagram", "Multi-Channel (LinkedIn + Email)"], defaultValue: "LinkedIn" },
    { id: "offer", label: "Offer / Lead Magnet", type: "text", placeholder: "e.g. Free AI Automation Audit Report", defaultValue: "Free 15-Minute AI Automation Strategy Audit" },
    { id: "brandVoice", label: "Brand Voice", type: "select", options: ["Professional & Authoritative", "Bold & Visionary", "Conversational & Technical"], defaultValue: "Professional & Authoritative" },
    { id: "campaignDuration", label: "Campaign Duration", type: "select", options: ["2 Weeks (Sprint)", "1 Month", "Quarterly (3 Months)"], defaultValue: "1 Month" },
  ],
  workflowDescription: "Automated 19-node marketing suite researching target audiences, analyzing competitors, crafting campaign pillars, drafting ad copy, verifying brand compliance, and scheduling posts.",
  trustStatement: "Every campaign is grounded in audience research, brand constraints, platform requirements, and measurable objectives.",
  metricsLabels: ["Audience Reach", "Content Assets", "Projected CTR", "Brand Score"],
  workflowNodes: [
    { id: "n1", label: "Campaign Brief", type: "trigger", kind: "trigger", description: "Receives marketing parameters, brand voice & target audience", modelOrTool: "Form Gateway", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Input Validation", type: "action", kind: "code", description: "Validates campaign objective, offer details & platform specs", modelOrTool: "Validation Engine", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Audience Research", type: "agent", kind: "code", description: "Analyzes ICP pain points, emotional triggers & online behavior", modelOrTool: "Audience AI", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Competitor Research", type: "action", kind: "http", description: "Scrapes competitor ads, messaging hooks & social engagement", modelOrTool: "Ad Scraper", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Trend Analysis", type: "action", kind: "code", description: "Fetches trending keywords & hashtag sentiment in industry", modelOrTool: "Trend Engine", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Positioning Agent", type: "agent", kind: "code", description: "Defines unique value proposition & core campaign angle", modelOrTool: "Positioning AI", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Campaign Strategy", type: "agent", kind: "code", description: "Maps multi-stage funnel strategy (Awareness -> Intent -> Demo)", modelOrTool: "Strategy AI", position: { x: 1070, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "Loop Over Content Pillars", type: "action", kind: "code", description: "Creates 4 strategic content pillars (Educational, Case Study, ROI, Product)", modelOrTool: "Pillar Engine", position: { x: 1240, y: 150 }, targetIds: ["n9"], targetLabels: { "n9": "pillar batch" } },
    { id: "n9", label: "Copy Generator", type: "agent", kind: "code", description: "Drafts 10 LinkedIn posts, ad variants & email copy", modelOrTool: "Gemini 1.5 Pro", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Creative Brief Generator", type: "action", kind: "code", description: "Generates image & carousel prompts for design team", modelOrTool: "Creative AI", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "IF: Brand Voice Aligned?", type: "agent", kind: "if", description: "Evaluates ad copy alignment against target brand guidelines", modelOrTool: "Voice Guardrail", position: { x: 1750, y: 150 }, targetIds: ["n12"], targetLabels: { "n12": "aligned (90%+)" } },
    { id: "n12", label: "Switch: Compliance Gate", type: "action", kind: "if", description: "Verifies advertising guidelines & claim substantiation", modelOrTool: "Compliance Gate", position: { x: 1920, y: 150 }, targetIds: ["n13"], targetLabels: { "n13": "approved" } },
    { id: "n13", label: "Platform Formatter", type: "action", kind: "code", description: "Formats character limits, line breaks & hashtags per platform", modelOrTool: "Formatter Engine", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Publishing Scheduler", type: "action", kind: "http", description: "Schedules post delivery slots across 30-day calendar", modelOrTool: "Buffer / Hootsuite API", position: { x: 2260, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Performance Data", type: "action", kind: "http", description: "Connects ad analytics API for impression tracking", modelOrTool: "LinkedIn Ads API", position: { x: 2430, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "KPI Analysis", type: "agent", kind: "code", description: "Predicts reach, clicks, CTR & cost-per-lead (CPL)", modelOrTool: "KPI Model", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "Report Builder", type: "action", kind: "http", description: "Generates visual campaign performance dashboard preview", modelOrTool: "Dashboard Engine", position: { x: 2770, y: 150 }, targetIds: ["n18"] },
    { id: "n18", label: "Slack Notification", type: "action", kind: "http", description: "Alerts marketing team on #marketing-campaigns channel", modelOrTool: "Slack Webhook", position: { x: 2940, y: 150 }, targetIds: ["n19"] },
    { id: "n19", label: "Audit Log", type: "output", kind: "trigger", description: "Logs full campaign creation metadata to database", modelOrTool: "Audit Engine", position: { x: 3110, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "mkt-linkedin-campaign",
      triggerPrompt: "Create a LinkedIn campaign",
      scenarioName: "LinkedIn B2B Lead Gen Campaign",
      outputPayload: {
        targetAudienceSummary: "VPs of Sales Ops & Operations Directors at mid-market SaaS companies struggling with manual CRM lead routing.",
        competitorInsights: "Competitors focus on static CRM tools; our wedge is zero-code visual n8n-style workflow automation.",
        campaignStrategy: "4-Week Funnel: Wk 1 Awareness (Problem Hook) -> Wk 2 Case Study (CloudScale ROI) -> Wk 3 Offer (Free AI Audit) -> Wk 4 Retargeting.",
        contentPillars: [
          "1. Operational Efficiency & Time Savings",
          "2. Real-World Case Studies (3x Conversion Lift)",
          "3. Technical Transparency & Live Workflow Demos",
          "4. Free AI Strategy Audit Offer",
        ],
        generatedPosts: [
          "Post 1 (Hook): '90% of VPs of Sales Ops waste 12 hours weekly copying leads into Salesforce. Here is how CloudScale automated it completely...'",
          "Post 2 (Case Study): 'How a 120-person team booked 48 qualified demos in 14 days using autonomous AI agents...'",
        ],
        advertisementCopy: "Headline: Stop Manually Routing Leads | Primary Text: Connect your outbound stack to autonomous AI agents. Book a 15-min strategy audit today.",
        creativeBriefs: "Visual: Dark mode React Flow canvas showing green active glowing nodes with 94% match badge.",
        publishingCalendar: "12 Scheduled Posts (3x per week for 4 weeks on LinkedIn)",
        kpiProjections: "Est Reach: 45,000 | Est Clicks: 1,800 | Projected CTR: 4.0% | Est Leads: 65",
        optimizationSuggestions: "Test A/B hook variant emphasizing '40% cost reduction' vs '3x lead speed'.",
      },
      metrics: [
        { label: "Audience Reach", value: "45,000" },
        { label: "Content Assets", value: "12 Posts" },
        { label: "Projected CTR", value: "4.0%" },
        { label: "Brand Score", value: "98/100" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19"],
      logs: [
        { nodeId: "n1", nodeName: "Campaign Brief", event: "Received campaign brief for LinkedIn B2B campaign", status: "success", durationMs: 60 },
        { nodeId: "n3", nodeName: "Audience Research", event: "Extracted ICP pain points for Sales Ops persona", status: "success", durationMs: 340 },
        { nodeId: "n9", nodeName: "Copy Generator", event: "Generated 10 LinkedIn ad post variants", status: "success", durationMs: 510 },
        { nodeId: "n11", nodeName: "Brand Voice Check", event: "Brand Voice compliance score: 98/100 (Passed)", status: "success", durationMs: 210 },
        { nodeId: "n14", nodeName: "Publishing Scheduler", event: "Scheduled 12 posts on Buffer publishing queue", status: "success", durationMs: 380 },
        { nodeId: "n18", nodeName: "Report Generator", event: "Compiled campaign strategy brief & post repository", status: "success", durationMs: 290 },
      ],
      generatedArtifact: {
        type: "campaign",
        title: "LinkedIn Campaign Master Kit & Content Plan",
        content: `CAMPAIGN MASTER KIT: B2B LEAD GEN
Objective: Drive Demos for Multi-Agent AI Suite
Platform: LinkedIn Sponsored Content

1. CONTENT CALENDAR & POST SAMPLE:
Week 1 - Post 1 (Awareness):
"90% of VPs of Sales Ops waste 12 hours weekly manually assigning leads and updating CRM fields.

We built an autonomous AI agent that handles discovery, ICP scoring, and calendar booking in under 10 seconds.

👉 Claim your free 15-minute AI Workflow Audit link below."

2. AD COPY VARIANTS:
• Variant A: "Stop wasting 12 hours weekly on manual lead routing."
• Variant B: "See how CloudScale booked 48 demos in 14 days using AI SDRs."

3. KPI FORECAST:
• Reach: 45,000 Impressions
• Clicks: 1,800
• Target Leads: 65 Qualified Demos`,
        downloadableFormat: "txt",
      },
    },
  ],
};
