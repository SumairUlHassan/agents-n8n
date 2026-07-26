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
    { id: "n1", label: "Command Gateway", type: "trigger", kind: "trigger", description: "Ingests multi-department business command", modelOrTool: "Unified Gateway", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Natural Language Parser", type: "action", kind: "code", description: "Parses prompt into structured domain sub-goals", modelOrTool: "NL Parser Engine", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Switch: Supervisor Router", type: "decision", kind: "if", description: "Supervisor analyzes intent and routes tasks to sub-agents", modelOrTool: "Groq Llama-3 Router", position: { x: 390, y: 150 }, targetIds: ["n4", "n5", "n6"], targetLabels: { "n4": "Sales & Marketing", "n5": "Finance & Ops", "n6": "HR & Support" } },
    { id: "n4", label: "Delegate: SDR & Marketing", type: "agent", kind: "code", description: "Delegates lead qualification, email copy & ad campaign drafting", modelOrTool: "SDR / Marketing Agent", position: { x: 560, y: 60 }, targetIds: ["n7"] },
    { id: "n5", label: "Delegate: Finance & Ops", type: "agent", kind: "code", description: "Delegates ledger audit, anomaly detection & SLA rerouting", modelOrTool: "Finance / Ops Agent", position: { x: 560, y: 150 }, targetIds: ["n7"] },
    { id: "n6", label: "Delegate: HR & Support", type: "agent", kind: "code", description: "Delegates candidate screening, interview booking & RAG answers", modelOrTool: "Recruiting / Support Agent", position: { x: 560, y: 240 }, targetIds: ["n7"] },
    { id: "n7", label: "Delegate: Research & Proposal", type: "agent", kind: "code", description: "Delegates market research, SQL analytics & proposal drafting", modelOrTool: "Research / Proposal Agent", position: { x: 730, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "Loop Over Agent Results", type: "action", kind: "code", description: "Aggregates and formats sub-agent responses in parallel", modelOrTool: "Result Aggregator", position: { x: 900, y: 150 }, targetIds: ["n9"], targetLabels: { "n9": "sub-agent batch" } },
    { id: "n9", label: "IF: Conflict Detected?", type: "decision", kind: "if", description: "Reconciles overlapping calendar, budget, or policy constraints", modelOrTool: "Conflict Resolver", position: { x: 1070, y: 150 }, targetIds: ["n11"], targetLabels: { "n11": "reconciled" } },
    { id: "n11", label: "Master Response Synthesizer", type: "agent", kind: "code", description: "Synthesizes multi-department output into unified master plan", modelOrTool: "Groq 70B Master Synthesizer", position: { x: 1240, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Master CRM & ERP Sync", type: "action", kind: "http", description: "Pushes unified updates to HubSpot, Salesforce, NetSuite & Jira", modelOrTool: "Enterprise Sync API", position: { x: 1410, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Executive Slack Brief", type: "action", kind: "http", description: "Dispatches consolidated executive summary to Slack & Email", modelOrTool: "Slack Webhook / Twilio", position: { x: 1580, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Execution Logger", type: "output", kind: "trigger", description: "Logs full 180+ node execution graph to master audit store", modelOrTool: "Audit Engine", position: { x: 1750, y: 150 }, targetIds: [] },
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
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n11", "n12", "n13", "n14"],
      skippedNodeIds: [],
      logs: [
        { nodeId: "n1", nodeName: "Command Gateway", event: "Received master business command", status: "success", durationMs: 80 },
        { nodeId: "n3", nodeName: "Switch: Supervisor Router", event: "Routed task to SDR, Proposal, and Financial sub-agents", status: "success", durationMs: 340 },
        { nodeId: "n4", nodeName: "Delegate: SDR & Marketing", event: "Executed SDR sub-agent qualification & outreach draft", status: "success", durationMs: 420 },
        { nodeId: "n5", nodeName: "Delegate: Finance & Ops", event: "Executed Financial Analyst sub-agent ledger audit", status: "success", durationMs: 390 },
        { nodeId: "n11", nodeName: "Master Response Synthesizer", event: "Live Groq 70B synthesized multi-department executive master plan", status: "success", durationMs: 480 },
      ]
    }
  ]
};
