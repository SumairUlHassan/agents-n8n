import { AgentConfig } from "@/types/agents";

export const proposalGeneratorAgentConfig: AgentConfig = {
  slug: "proposal-generator",
  title: "AI Proposal Generator",
  subtitle: "Researches prospects and transforms client requirements into tailored, professional business proposals.",
  statusText: "Live — connected to proposal-generation pipeline",
  inputType: "form",
  placeholder: "Enter project scope or URL...",
  submitLabel: "Generate Proposal",
  examplePrompts: [
    "Audit this company website",
    "Create an AI automation proposal",
    "Generate project scope",
    "Build a pricing estimate",
  ],
  fields: [
    { id: "prospectName", label: "Prospect Contact Name", type: "text", placeholder: "e.g. Michael Vance, VP Technology", defaultValue: "Michael Vance" },
    { id: "companyName", label: "Company Name", type: "text", placeholder: "e.g. NexaCorp Global", defaultValue: "NexaCorp Global" },
    { id: "companyWebsite", label: "Company Website URL", type: "url", placeholder: "https://nexacorp-demo.com", defaultValue: "https://nexacorp-demo.com" },
    { id: "projectRequirements", label: "Project Requirements", type: "textarea", placeholder: "Describe requested features & goals...", defaultValue: "Build an enterprise multi-agent workflow platform connecting HubSpot, Salesforce, and Zendesk with automated lead scoring." },
    { id: "proposedService", label: "Proposed Service", type: "select", options: ["Custom AI Agent Development", "Enterprise RAG System Implementation", "Workflow Automation Audit", "Full-Stack AI Transformation"], defaultValue: "Custom AI Agent Development" },
    { id: "estimatedBudget", label: "Target Budget ($)", type: "text", placeholder: "$30,000 - $50,000", defaultValue: "$45,000" },
    { id: "timeline", label: "Estimated Timeline", type: "select", options: ["2 Weeks (Sprint)", "4-6 Weeks (Standard)", "8-12 Weeks (Enterprise)"], defaultValue: "4-6 Weeks (Standard)" },
    { id: "pricingModel", label: "Pricing Model", type: "select", options: ["Fixed-Price Project", "Monthly Subscription / Retainer", "Time & Materials"], defaultValue: "Fixed-Price Project" },
  ],
  workflowDescription: "Automated 19-node proposal engine scraping prospect websites, parsing business requirements, architecting solutions, calculating pricing, evaluating risks, and rendering interactive PDF proposals.",
  trustStatement: "Every proposal is generated from verified company context, structured requirements, pricing rules, and reviewable assumptions.",
  metricsLabels: ["Proposal Value", "Win Probability", "Build Duration", "Target Margin"],
  workflowNodes: [
    { id: "n1", label: "Proposal Request", type: "trigger", kind: "trigger", description: "Receives project brief and prospect URL", modelOrTool: "Form Gateway", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Input Validation", type: "action", kind: "code", description: "Validates website URL, required budget fields & company details", modelOrTool: "Validation Engine", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Website Scraper", type: "action", kind: "http", description: "Scrapes prospect site for company size, mission, and current tech stack", modelOrTool: "Firecrawl Scraper", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Company Research", type: "agent", kind: "code", description: "Enriches company research with Crunchbase & market positioning", modelOrTool: "Research AI", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Industry Analysis", type: "agent", kind: "code", description: "Analyzes industry competitors, regulations, and digital maturity", modelOrTool: "Industry Analyzer", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Pain-Point Detection", type: "agent", kind: "code", description: "Identifies core operational bottlenecks & workflow inefficiencies", modelOrTool: "Pain-Point Detector", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Loop Over Deliverables", type: "action", kind: "code", description: "Deconstructs unstructured requirements into deliverables & milestones", modelOrTool: "Req Engine", position: { x: 1070, y: 150 }, targetIds: ["n8"], targetLabels: { "n8": "deliverable item" } },
    { id: "n8", label: "Solution Architect", type: "agent", kind: "code", description: "Architects recommended tech stack, AI model selection & APIs", modelOrTool: "Architect AI", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Scope Generator", type: "agent", kind: "code", description: "Drafts detailed 4-phase project scope & sprint breakdown", modelOrTool: "Scope AI", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Timeline Generator", type: "action", kind: "code", description: "Maps sprint timelines, review checkpoints, and deployment target", modelOrTool: "Timeline Engine", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "Pricing Estimator", type: "action", kind: "code", description: "Calculates cost breakdown based on hourly rates & dev effort", modelOrTool: "Pricing Matrix", position: { x: 1750, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Switch: Risk Assessor", type: "agent", kind: "if", description: "Evaluates technical risks, integration dependencies & contingencies", modelOrTool: "Risk Assessor", position: { x: 1920, y: 150 }, targetIds: ["n13"], targetLabels: { "n13": "acceptable risk" } },
    { id: "n13", label: "Case Study Matcher", type: "action", kind: "http", description: "Pairs proposal with relevant past client case study", modelOrTool: "Case Study DB", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Proposal Writer", type: "agent", kind: "code", description: "Synthesizes executive summary, scope, deliverables & terms", modelOrTool: "Gemini 1.5 Pro", position: { x: 2260, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "IF: Review Passed?", type: "action", kind: "if", description: "Checks grammar, branding consistency & legal disclaimer", modelOrTool: "Quality Guardrail", position: { x: 2430, y: 150 }, targetIds: ["n16"], targetLabels: { "n16": "passed QA" } },
    { id: "n16", label: "PDF Generator", type: "action", kind: "http", description: "Renders styled PDF proposal document", modelOrTool: "PDF Engine", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "Send Proposal Email", type: "action", kind: "http", description: "Sends proposal email link to client decision maker", modelOrTool: "SendGrid / SMTP", position: { x: 2770, y: 150 }, targetIds: ["n18"] },
    { id: "n18", label: "CRM Deal Update", type: "action", kind: "http", description: "Creates proposal record in HubSpot / Salesforce CRM", modelOrTool: "HubSpot API", position: { x: 2940, y: 150 }, targetIds: ["n19"] },
    { id: "n19", label: "Audit Log", type: "output", kind: "trigger", description: "Logs proposal generation event to audit repository", modelOrTool: "Audit Engine", position: { x: 3110, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "prop-ai-automation",
      triggerPrompt: "Create an AI automation proposal",
      scenarioName: "Enterprise AI Automation Project Proposal",
      outputPayload: {
        companyOverview: "NexaCorp Global — Mid-market logistics technology provider with 350 employees.",
        identifiedPainPoints: [
          "1. 15+ hours weekly spent manually qualifying sales leads across HubSpot & email",
          "2. Slow customer support response times during off-peak weekend hours",
          "3. Lack of unified audit logging for compliance tracking",
        ],
        proposedSolution: "Custom Multi-Agent AI Suite featuring AI SDR, Customer Support RAG Agent, and Operations Control Dashboard.",
        scopeOfWork: "Phase 1: Architecture & RAG Setup (Wk 1-2) | Phase 2: SDR & Support Agent Build (Wk 3-4) | Phase 3: Integration & Testing (Wk 5) | Phase 4: Deployment & Staff Training (Wk 6)",
        deliverables: [
          "• 3 Custom AI Agent Workflows built on Next.js & React Flow",
          "• Webhook integrations for HubSpot CRM & Salesforce",
          "• Executive Analytics Dashboard with Real-time Audit Logs",
          "• 1-Year Maintenance & SLA Guarantee",
        ],
        timeline: "6 Weeks total (Target launch: September 15)",
        pricingEstimate: "Fixed-Price Investment: $45,000 (Milestones: $15k Upfront / $15k Beta / $15k Launch)",
        assumptions: "NexaCorp provides API keys for HubSpot and Zendesk sandbox environments within 3 business days.",
        risks: "Low Risk — standard REST API endpoints; fallback simulation mechanisms included.",
        proposalPreview: "Complete 4-page interactive business proposal document ready for client signature.",
      },
      metrics: [
        { label: "Proposal Value", value: "$45,000" },
        { label: "Win Probability", value: "88%" },
        { label: "Build Duration", value: "6 Weeks" },
        { label: "Target Margin", value: "62%" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19"],
      logs: [
        { nodeId: "n1", nodeName: "Proposal Request", event: "Initiated proposal generation for NexaCorp Global", status: "success", durationMs: 80 },
        { nodeId: "n3", nodeName: "Website Scraper", event: "Scraped tech stack context from nexacorp-demo.com", status: "success", durationMs: 450 },
        { nodeId: "n6", nodeName: "Pain-Point Detection", event: "Identified 3 high-impact manual workflow bottlenecks", status: "success", durationMs: 380 },
        { nodeId: "n8", nodeName: "Solution Architect", event: "Architected 3-Agent architecture using Next.js & Gemini Pro", status: "success", durationMs: 510 },
        { nodeId: "n11", nodeName: "Pricing Estimator", event: "Calculated fixed-price fee $45,000 based on 160 engineering hours", status: "success", durationMs: 290 },
        { nodeId: "n16", nodeName: "PDF Generator", event: "Compiled PDF proposal artifact with custom branding", status: "success", durationMs: 420 },
      ],
      generatedArtifact: {
        type: "proposal",
        title: "Commercial Proposal — NexaCorp AI Transformation",
        content: `BUSINESS PROPOSAL & SOLUTION ARCHITECTURE
Prepared for: Michael Vance (VP Tech, NexaCorp Global)
Prepared by: Elixr Co. AI Systems

1. EXECUTIVE SUMMARY:
Elixr Co. proposes developing a custom Multi-Agent AI Automation Platform to streamline NexaCorp's sales outreach, customer support RAG, and operations monitoring.

2. PROJECT DELIVERABLES:
• AI SDR Agent: Automated prospect qualification and personalized email outreach.
• Support Agent: Grounded RAG customer support system with Zendesk escalation.
• Operations Dashboard: Live React Flow visualization with audit logging.

3. TIMELINE & INVESTMENT:
• Timeline: 6 Weeks (4 Sprints)
• Investment: $45,000 USD (Fixed-Price)
• Payment Schedule: $15,000 Deposit | $15,000 Milestone 2 | $15,000 Delivery

4. ACCEPTANCE & AUTHORIZATION:
Sign below to approve project initiation.`,
        downloadableFormat: "pdf",
      },
    },
  ],
};
