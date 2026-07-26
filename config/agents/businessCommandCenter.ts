import { AgentConfig } from "@/types/agents";

export const businessCommandCenterAgentConfig: AgentConfig = {
  slug: "business-command-center",
  title: "AI Business Command Center",
  subtitle: "One AI agent. Every department. One connected business operating system.",
  statusText: "Live — 180+ Node Master Supervisor Orchestrator",
  badgeText: "Agent 01",
  inputType: "hybrid",
  placeholder: "Enter any business command (e.g. 'Find 5 Texas SaaS leads, draft a proposal for Acme Corp, and audit Q3 spend')...",
  submitLabel: "Open Command Center",
  examplePrompts: [
    "Find 5 SaaS prospects in Texas, draft a cold email sequence, and book demo slots",
    "Audit Q3 cloud spending anomalies and prepare an executive summary for the CFO",
    "Screen senior AI engineer resumes and schedule 45-min technical interviews",
    "Draft a tailored $50k proposal for Acme Corp and update the sales pipeline",
    "Analyze recent customer churn trends and generate a 14-day LinkedIn marketing campaign",
  ],
  fields: [
    {
      id: "department",
      label: "Department Focus",
      type: "select",
      options: [
        "All Departments (Autonomous Supervisor)",
        "Sales & Prospecting",
        "Customer Support RAG",
        "Recruitment & HR",
        "Finance & Auditing",
        "Operations & SLA",
        "Marketing & Content",
        "Research & Strategy",
        "Proposal Generation",
        "Data Science & Analytics",
      ],
      defaultValue: "All Departments (Autonomous Supervisor)",
    },
    {
      id: "priority",
      label: "Execution Mode",
      type: "select",
      options: ["Autonomous Supervisor Delegation", "Real-Time Parallel Execution", "Human-in-the-Loop Review"],
      defaultValue: "Autonomous Supervisor Delegation",
    },
    {
      id: "commandScope",
      label: "Target Scope / Enterprise Objective",
      type: "textarea",
      placeholder: "Specify company context or sub-agent delegation goals...",
      defaultValue: "Orchestrate lead generation, customer support deflection, financial audit, and executive briefing across all 10 specialized agent pipelines.",
    },
  ],
  workflowDescription: "180+ Node Master Supervisor Pipeline orchestrating SDR, Support, Recruiting, Executive Assistant, Finance, Operations, Proposal, Marketing, Research, and Data Science sub-agents from a single unified workspace.",
  trustStatement: "Supervisor agent understands high-level intent and delegates execution to specialized internal agents with full cross-departmental audit logging.",
  metricsLabels: ["Sub-Agents Routed", "Execution Accuracy", "Department Coverage", "Time Saved"],
  workflowNodes: [
    // Left Sequential Input Track
    { id: "n1", label: "New Request", type: "trigger", kind: "trigger", description: "Receives incoming multi-department business command", modelOrTool: "Webhook", position: { x: 50, y: 350 }, targetIds: ["n2"] },
    { id: "n2", label: "Input Parser", type: "action", kind: "code", description: "Parses prompt into structured domain sub-goals", modelOrTool: "Code", position: { x: 220, y: 350 }, targetIds: ["n3"] },
    { id: "n3", label: "Intent Classifier", type: "agent", kind: "code", description: "Classifies intent across Sales, Support, HR, Finance, Marketing, Ops, Research & Data", modelOrTool: "AI Agent", position: { x: 390, y: 350 }, targetIds: ["n4"] },
    { id: "n4", label: "Context Enricher", type: "action", kind: "http", description: "Fetches company history, CRM context & enterprise preferences", modelOrTool: "Postgres", position: { x: 560, y: 350 }, targetIds: ["n5"] },
    { id: "n5", label: "Supervisor Agent", type: "agent", kind: "code", description: "Master AI Supervisor routes sub-tasks to 10 specialized departmental agents", modelOrTool: "AI Agent", position: { x: 730, y: 350 }, targetIds: ["n6_1", "n7_1", "n8_1", "n9_1", "n10_1", "n11_1", "n12_1", "n13_1", "n14_1", "n15_1"], targetLabels: { "n6_1": "Sales", "n7_1": "Support", "n8_1": "Recruitment", "n9_1": "Ops", "n10_1": "EA", "n11_1": "Finance", "n12_1": "Marketing", "n13_1": "Research", "n14_1": "Proposal", "n15_1": "Data" } },

    // 10 Parallel Department Tracks
    // 1. Sales & Outreach
    { id: "n6_1", label: "SDR Agent", type: "agent", kind: "code", description: "Finds leads, qualifies ICP fit & personalizes outreach", modelOrTool: "AI Agent", position: { x: 900, y: 30 }, targetIds: ["n6_2"] },
    { id: "n6_2", label: "CRM / Outreach Tools", type: "action", kind: "http", description: "Pushes prospect record & schedules demo slots", modelOrTool: "HubSpot", position: { x: 1070, y: 30 }, targetIds: ["n16"] },

    // 2. Customer Support
    { id: "n7_1", label: "Support Agent", type: "agent", kind: "code", description: "Answers customer queries with RAG citations & handles tickets", modelOrTool: "AI Agent", position: { x: 900, y: 100 }, targetIds: ["n7_2"] },
    { id: "n7_2", label: "Knowledge Base", type: "action", kind: "http", description: "Queries vector database for verified product docs", modelOrTool: "Pinecone", position: { x: 1070, y: 100 }, targetIds: ["n16"] },

    // 3. Recruitment
    { id: "n8_1", label: "Recruiting Agent", type: "agent", kind: "code", description: "Screens candidate resumes & generates interview scorecards", modelOrTool: "AI Agent", position: { x: 900, y: 170 }, targetIds: ["n8_2"] },
    { id: "n8_2", label: "ATS / HR Tools", type: "action", kind: "http", description: "Updates candidate stage & notifies recruiter", modelOrTool: "Greenhouse", position: { x: 1070, y: 170 }, targetIds: ["n16"] },

    // 4. Operations
    { id: "n9_1", label: "Operations Agent", type: "agent", kind: "code", description: "Monitors carrier delays, SLA breaches & reroutes orders", modelOrTool: "AI Agent", position: { x: 900, y: 240 }, targetIds: ["n9_2"] },
    { id: "n9_2", label: "Operations Tools", type: "action", kind: "http", description: "Updates warehouse picking queues & shipment tracking", modelOrTool: "Airtable", position: { x: 1070, y: 240 }, targetIds: ["n16"] },

    // 5. Executive Assistant
    { id: "n10_1", label: "Executive Assistant", type: "agent", kind: "code", description: "Prioritizes inbox threads, organizes calendar & drafts emails", modelOrTool: "AI Agent", position: { x: 900, y: 310 }, targetIds: ["n10_2"] },
    { id: "n10_2", label: "Calendar / Email", type: "action", kind: "http", description: "Books conflict-free slots & syncs executive daily log", modelOrTool: "Google Calendar", position: { x: 1070, y: 310 }, targetIds: ["n16"] },

    // 6. Finance
    { id: "n11_1", label: "Financial Analyst Agent", type: "agent", kind: "code", description: "Audits expense ledgers, flags anomalies & forecasts revenue", modelOrTool: "AI Agent", position: { x: 900, y: 380 }, targetIds: ["n11_2"] },
    { id: "n11_2", label: "Finance Data", type: "action", kind: "http", description: "Fetches ledger sheets & updates variance models", modelOrTool: "Google Sheets", position: { x: 1070, y: 380 }, targetIds: ["n16"] },

    // 7. Marketing
    { id: "n12_1", label: "Marketing Agent", type: "agent", kind: "code", description: "Crafts multi-channel ad copy & 14-day content calendars", modelOrTool: "AI Agent", position: { x: 900, y: 450 }, targetIds: ["n12_2"] },
    { id: "n12_2", label: "Marketing Tools", type: "action", kind: "http", description: "Dispatches ad variants & tracks CTR performance", modelOrTool: "Meta Ads", position: { x: 1070, y: 450 }, targetIds: ["n16"] },

    // 8. Research
    { id: "n13_1", label: "Research Agent", type: "agent", kind: "code", description: "Synthesizes market research, whitepapers & counter-arguments", modelOrTool: "AI Agent", position: { x: 900, y: 520 }, targetIds: ["n13_2"] },
    { id: "n13_2", label: "Web Search", type: "action", kind: "http", description: "Scrapes Google Scholar, PubMed & academic APIs", modelOrTool: "Serper Dev API", position: { x: 1070, y: 520 }, targetIds: ["n16"] },

    // 9. Proposal & Docs
    { id: "n14_1", label: "Proposal Generator", type: "agent", kind: "code", description: "Drafts tailored SOW proposals, pricing tiers & scope breakdowns", modelOrTool: "AI Agent", position: { x: 900, y: 590 }, targetIds: ["n14_2"] },
    { id: "n14_2", label: "Document Tools", type: "action", kind: "http", description: "Generates PDF preview links & syncs deal workspace", modelOrTool: "Notion", position: { x: 1070, y: 590 }, targetIds: ["n16"] },

    // 10. Data & Analytics
    { id: "n15_1", label: "Data Analyst Agent", type: "agent", kind: "code", description: "Generates SQL queries, statistical correlations & data reports", modelOrTool: "AI Agent", position: { x: 900, y: 660 }, targetIds: ["n15_2"] },
    { id: "n15_2", label: "Data Warehouse", type: "action", kind: "http", description: "Queries analytical database & renders dashboard cards", modelOrTool: "Snowflake", position: { x: 1070, y: 660 }, targetIds: ["n16"] },

    // Right Re-convergence Output Pipeline
    { id: "n16", label: "Response Synthesizer", type: "agent", kind: "code", description: "Synthesizes parallel sub-agent deliverables into unified master plan", modelOrTool: "AI Agent", position: { x: 1240, y: 350 }, targetIds: ["n17"] },
    { id: "n17", label: "Response Formatter", type: "action", kind: "code", description: "Formats master report with downloadable artifacts & metrics", modelOrTool: "Code", position: { x: 1410, y: 350 }, targetIds: ["n18"] },
    { id: "n18", label: "Send Response", type: "output", kind: "trigger", description: "Dispatches final payload to user chat, Slack & CRM endpoints", modelOrTool: "Webhook", position: { x: 1580, y: 350 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "bcc-master-command",
      triggerPrompt: "Find 5 SaaS prospects in Texas, draft a proposal for Acme, and audit Q3 spend",
      scenarioName: "Unified Multi-Department Autonomous Execution",
      outputPayload: {
        supervisorStatus: "Master Command Center Executed Successfully",
        routedSubAgents: [
          "AI SDR Agent (Found 5 Texas SaaS prospects, scored 94/100)",
          "Proposal Generator Agent (Drafted $45,000 enterprise proposal)",
          "Financial Analyst Agent (Audited Q3 cloud spend, identified $14,200 savings)"
        ],
        masterExecutiveSummary: "The AI Business Command Center processed your cross-departmental command across 3 specialized sub-agents. 5 qualified leads were identified, a custom proposal was generated, and $14,200 in recurring cloud spend anomalies were flagged.",
        subAgentResults: {
          sdr: "5 prospects qualified (Sarah Jenkins - VP Ops at ApexFlow)",
          proposal: "Phase 1-3 AI Automation proposal created for Acme Corp",
          finance: "$14.2k cloud duplicate charge detected & audit memo drafted"
        },
        unifiedNextSteps: [
          "Review & dispatch prospect outreach emails",
          "Send PDF proposal to Acme Corp decision maker",
          "Approve cloud spend refund dispute claim"
        ]
      },
      metrics: [
        { label: "Sub-Agents Routed", value: "10 Agents" },
        { label: "Execution Accuracy", value: "99.4%" },
        { label: "Department Coverage", value: "100%" },
        { label: "Time Saved", value: "14.5 Hours" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6_1", "n6_2", "n7_1", "n7_2", "n8_1", "n8_2", "n9_1", "n9_2", "n10_1", "n10_2", "n11_1", "n11_2", "n12_1", "n12_2", "n13_1", "n13_2", "n14_1", "n14_2", "n15_1", "n15_2", "n16", "n17", "n18"],
      skippedNodeIds: [],
      logs: [
        { nodeId: "n1", nodeName: "New Request", event: "Received master business command", status: "success", durationMs: 80 },
        { nodeId: "n3", nodeName: "Intent Classifier", event: "Classified multi-departmental intent across SDR, Finance & Proposal", status: "success", durationMs: 340 },
        { nodeId: "n5", nodeName: "Supervisor Agent", event: "Delegated sub-tasks to 10 parallel departmental agents", status: "success", durationMs: 420 },
        { nodeId: "n6_1", nodeName: "SDR Agent", event: "Executed SDR sub-agent qualification & outreach draft", status: "success", durationMs: 390 },
        { nodeId: "n11_1", nodeName: "Financial Analyst Agent", event: "Executed Financial Analyst sub-agent ledger audit", status: "success", durationMs: 410 },
        { nodeId: "n16", nodeName: "Response Synthesizer", event: "Synthesized 10 sub-agent deliverables into master executive report", status: "success", durationMs: 480 },
      ]
    }
  ]
};
