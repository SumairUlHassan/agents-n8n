import { AgentConfig } from "@/types/agents";

export const researchAgentConfig: AgentConfig = {
  slug: "research",
  title: "Autonomous Research Agent",
  subtitle: "Searches multiple sources, evaluates evidence, compares findings, and generates citation-backed research reports.",
  statusText: "Live — connected to multi-source research pipeline",
  inputType: "hybrid",
  placeholder: "Enter research topic or complex question...",
  submitLabel: "Start Research",
  examplePrompts: [
    "Research AI adoption in healthcare",
    "Compare leading CRM platforms",
    "Analyze a market opportunity",
    "Create a cited research report",
  ],
  fields: [
    { id: "researchQuestion", label: "Research Question", type: "textarea", placeholder: "e.g. What are the key drivers and compliance hurdles for AI adoption in enterprise healthcare?", defaultValue: "What are the primary drivers, ROI metrics, and HIPAA compliance risks for AI agent adoption in healthcare in 2026?" },
    { id: "researchDepth", label: "Research Depth", type: "select", options: ["Quick Scan (5 Sources)", "Standard Deep-Dive (15+ Sources)", "Exhaustive Academic Review"], defaultValue: "Standard Deep-Dive (15+ Sources)" },
    { id: "dateRange", label: "Publication Date Range", type: "select", options: ["Past 6 Months", "Past Year (2025-2026)", "Past 3 Years"], defaultValue: "Past Year (2025-2026)" },
    { id: "preferredSources", label: "Preferred Source Types", type: "select", options: ["Peer-Reviewed & Analyst Reports (Gartner, McKinsey)", "Industry News & Whitepapers", "All Web Sources"], defaultValue: "Peer-Reviewed & Analyst Reports (Gartner, McKinsey)" },
    { id: "outputFormat", label: "Output Format", type: "select", options: ["Full Cited Report with Executive Summary", "Comparative Analysis Matrix", "Bullet Point Briefing"], defaultValue: "Full Cited Report with Executive Summary" },
    { id: "citationStyle", label: "Citation Style", type: "select", options: ["APA Style", "IEEE Style", "Inline Markdown Links"], defaultValue: "APA Style" },
  ],
  workflowDescription: "Automated 18-node research pipeline performing query decomposition, web & document retrieval, source quality scoring, claim verification, contradiction resolution, synthesis, and citation formatting.",
  trustStatement: "Every conclusion is linked to its supporting evidence, source-quality score, and traceable research step.",
  metricsLabels: ["Sources Reviewed", "Reliable Sources", "Claims Verified", "Citation Count"],
  workflowNodes: [
    { id: "n1", label: "Research Request", type: "trigger", kind: "trigger", description: "Receives research question & depth parameters", modelOrTool: "Query Gateway", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Query Decomposition", type: "agent", kind: "code", description: "Breaks broad topic into 5 targeted search sub-queries", modelOrTool: "Decomposer AI", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Research Plan", type: "action", kind: "code", description: "Drafts research plan specifying target domains & inclusion criteria", modelOrTool: "Planner Engine", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Source Search", type: "action", kind: "http", description: "Queries Google Scholar, PubMed, ArXiv, and web search APIs", modelOrTool: "Serper / Tavily API", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Loop Over Search URLs", type: "action", kind: "code", description: "Scrapes full text content from top search result URLs", modelOrTool: "Firecrawl Scraper", position: { x: 730, y: 150 }, targetIds: ["n6"], targetLabels: { "n6": "URL batch" } },
    { id: "n6", label: "Document Retrieval", type: "action", kind: "http", description: "Parses PDF whitepapers, Gartner reports & clinical studies", modelOrTool: "PDF Reader AI", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "IF: Reliable Source?", type: "agent", kind: "if", description: "Scores domain authority, publish date, author & peer review status", modelOrTool: "Authority Evaluator", position: { x: 1070, y: 150 }, targetIds: ["n8"], targetLabels: { "n8": "authority >= 80%" } },
    { id: "n8", label: "Duplicate Removal", type: "action", kind: "code", description: "Deduplicates redundant articles & syndicated press releases", modelOrTool: "Deduper Engine", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Fact Extraction", type: "agent", kind: "code", description: "Extracts key statistical metrics, quotes & findings from text", modelOrTool: "Fact Extractor AI", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Claim Verification", type: "agent", kind: "code", description: "Cross-checks facts against secondary independent sources", modelOrTool: "Verifier AI", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "Switch: Contradiction Resolver", type: "agent", kind: "if", description: "Identifies conflicting data points (e.g. 40% vs 25% adoption)", modelOrTool: "Contradiction AI", position: { x: 1750, y: 150 }, targetIds: ["n12"], targetLabels: { "n12": "consensus verified" } },
    { id: "n12", label: "Evidence Grouping", type: "action", kind: "code", description: "Clusters findings into logical thematic chapters", modelOrTool: "Clustering AI", position: { x: 1920, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Synthesis Agent", type: "agent", kind: "code", description: "Synthesizes multi-source evidence into coherent narrative", modelOrTool: "Gemini 1.5 Pro", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Citation Builder", type: "action", kind: "code", description: "Appends APA formatted reference list & inline index numbers", modelOrTool: "Citation Engine", position: { x: 2260, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Report Writer", type: "agent", kind: "code", description: "Compiles executive research document with tables & charts", modelOrTool: "Writer AI", position: { x: 2430, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "Quality Review", type: "action", kind: "code", description: "Checks hallucination rate & citation mapping accuracy", modelOrTool: "Quality Guardrail", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "Export Report", type: "action", kind: "http", description: "Generates downloadable PDF research report", modelOrTool: "Exporter API", position: { x: 2770, y: 150 }, targetIds: ["n18"] },
    { id: "n18", label: "Audit Log", type: "output", kind: "trigger", description: "Stores research findings and citation metadata in audit database", modelOrTool: "Audit Engine", position: { x: 2940, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "res-healthcare-ai",
      triggerPrompt: "Research AI adoption in healthcare",
      scenarioName: "Healthcare AI Agent Adoption Deep-Dive",
      outputPayload: {
        researchPlan: "5-Step Investigation: 1) Market adoption rates, 2) Clinical ROI, 3) BAA & HIPAA compliance, 4) Vendor landscape, 5) Case studies.",
        sourcesReviewed: "18 Total Sources (14 High Authority: McKinsey, Gartner, HIMSS Journal, NEJM Catalyst)",
        sourceQualityScores: "Average Source Authority Score: 94/100 (High Trust)",
        keyFindings: [
          "• Healthcare AI adoption grew 42% YoY in 2025-2026, driven by administrative automation.",
          "• Ambient clinical scribes reduced physician documentation time by 2.1 hours daily.",
          "• 78% of healthcare leaders cite BAA (Business Associate Agreement) compliance as primary vendor prerequisite.",
        ],
        conflictingEvidence: "McKinsey estimates 35% cost savings; HIMSS survey notes net savings closer to 22% due to initial training overhead.",
        comparisonTable: "Matrix comparing Top 4 Healthcare AI platforms across HIPAA compliance, EHR integration & cost.",
        conclusions: "AI agents in healthcare have transitioned from experimental pilots to core operational requirements for clinical workflow efficiency.",
        limitations: "Long-term 5-year patient outcome data remains pending.",
        citations: [
          "[1] McKinsey & Company. (2025). The Economics of AI in Healthcare Systems.",
          "[2] NEJM Catalyst. (2026). Measuring Clinical Time Savings with LLM Assistants.",
          "[3] Gartner Inc. (2025). Hype Cycle for Healthcare Technology.",
        ],
        researchReportPreview: "Full 6-page cited research paper ready for download.",
      },
      metrics: [
        { label: "Sources Reviewed", value: "18" },
        { label: "Reliable Sources", value: "14" },
        { label: "Claims Verified", value: "32" },
        { label: "Citation Count", value: "18 Refs" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18"],
      logs: [
        { nodeId: "n1", nodeName: "Research Request", event: "Initiated deep-dive query on Healthcare AI adoption", status: "success", durationMs: 70 },
        { nodeId: "n4", nodeName: "Source Search", event: "Queried PubMed & Google Scholar APIs (Retrieved 24 articles)", status: "success", durationMs: 520 },
        { nodeId: "n7", nodeName: "Source Quality Scoring", event: "Filter applied: 14 sources rated High Authority (Score >= 90)", status: "success", durationMs: 310 },
        { nodeId: "n10", nodeName: "Claim Verification", event: "Verified 32 factual claims across independent papers", status: "success", durationMs: 460 },
        { nodeId: "n14", nodeName: "Citation Builder", event: "Built 18 APA-formatted citations with DOI links", status: "success", durationMs: 240 },
        { nodeId: "n17", nodeName: "Export Report", event: "Generated downloadable research report PDF", status: "success", durationMs: 380 },
      ],
      generatedArtifact: {
        type: "research",
        title: "Cited Research Paper — AI Agent Adoption in Healthcare",
        content: `RESEARCH REPORT: AI ADOPTION IN HEALTHCARE (2026)
Author: Autonomous Research Agent
Citation Style: APA (18 Sources)

ABSTRACT:
This study synthesizes evidence from 18 peer-reviewed journals and industry analyst reports regarding the operational ROI and regulatory hurdles of AI agent deployment in enterprise healthcare environments.

1. MARKET ADOPTION TRENDS:
AI agent adoption in clinical & administrative healthcare workflows accelerated by 42% YoY in 2025-2026 [1]. Primary drivers include physician burnout reduction and automated claims processing.

2. CLINICAL & OPERATIONAL ROI:
Deployment of ambient clinical documentation agents resulted in a 2.1-hour daily reduction in EHR documentation time per physician [2]. Net administrative cost savings average 22-35% across hospital networks [1].

3. COMPLIANCE & SAFETY GUARDRAILS:
78% of hospital CIOs mandate strict BAA execution, zero data retention agreements, and HIPAA-compliant SOC-2 Type II validation prior to vendor onboarding [3].

REFERENCES:
[1] McKinsey & Company. (2025). The Economics of AI in Healthcare Systems.
[2] NEJM Catalyst. (2026). Measuring Clinical Time Savings with LLM Assistants.
[3] Gartner Inc. (2025). Hype Cycle for Healthcare Technology.`,
        downloadableFormat: "pdf",
      },
    },
  ],
};
