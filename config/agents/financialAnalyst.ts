import { AgentConfig } from "@/types/agents";

export const financialAnalystAgentConfig: AgentConfig = {
  slug: "financial-analyst",
  title: "AI Financial Analyst",
  subtitle: "Analyzes financial data, detects unusual activity, forecasts performance, and produces decision-ready insights.",
  statusText: "Live — connected to financial analysis pipeline",
  inputType: "upload",
  placeholder: "Upload financial statement or CSV file...",
  submitLabel: "Run Financial Analysis",
  examplePrompts: [
    "Analyze monthly expenses",
    "Forecast next-quarter revenue",
    "Find unusual transactions",
    "Summarize financial performance",
  ],
  fields: [
    { id: "analysisObjective", label: "Analysis Objective", type: "select", options: ["Expense Breakdown & Anomaly Detection", "Quarterly Revenue Forecast", "Margin Variance Analysis", "Full Financial Audit"], defaultValue: "Expense Breakdown & Anomaly Detection" },
    { id: "forecastPeriod", label: "Forecast Period", type: "select", options: ["1 Quarter ahead", "2 Quarters ahead", "Full Year (4 Quarters)"], defaultValue: "1 Quarter ahead" },
    { id: "currency", label: "Currency", type: "select", options: ["USD ($)", "EUR (€)", "GBP (£)", "CAD ($)"], defaultValue: "USD ($)" },
    { id: "department", label: "Department Filter", type: "select", options: ["All Departments", "Engineering", "Sales & Marketing", "Operations"], defaultValue: "All Departments" },
    { id: "financialFile", label: "Financial Data File (CSV / XLSX)", type: "file" },
  ],
  supportedFiles: ["CSV", "XLSX", "PDF Invoices"],
  workflowDescription: "Automated 17-node financial engine extracting tabular data, cleaning transactions, calculating variances, flagging anomalous spend, and generating forecast models.",
  trustStatement: "Every metric is derived from uploaded data with visible assumptions, anomaly flags, and calculation logs.",
  metricsLabels: ["Revenue Processed", "Gross Margin", "Anomalies Flagged", "Forecast Accuracy"],
  workflowNodes: [
    { id: "n1", label: "File Upload Trigger", type: "trigger", description: "Receives CSV, XLSX or PDF financial statement upload", modelOrTool: "File Upload Stream", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "File Validation", type: "action", description: "Validates file encoding, MIME type, and size limits", modelOrTool: "Validator Engine", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Data Extraction", type: "action", description: "Extracts tabular rows, sheet structures, and invoice metadata", modelOrTool: "SheetJS / PDF-Table", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Schema Detection", type: "action", description: "Maps columns to date, transaction_id, category, amount, vendor", modelOrTool: "Schema AI", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Data Cleaning", type: "action", description: "Handles missing values, currency conversions & date normalization", modelOrTool: "Data Cleaner", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Transaction Classification", type: "agent", description: "Classifies expense items into GAAP/IFRS categories", modelOrTool: "Classifier AI", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Metric Calculation", type: "action", description: "Computes total revenue, COGS, OPEX, EBITDA, and gross margin", modelOrTool: "Math Engine", position: { x: 1070, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "Variance Analysis", type: "action", description: "Compares current period figures against prior quarter benchmarks", modelOrTool: "Variance Engine", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Anomaly Detection", type: "agent", description: "Flags outlier transactions (> 3 std dev) & duplicate invoices", modelOrTool: "Isolation Forest AI", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Forecast Model", type: "agent", description: "Generates time-series trend model for next quarter revenue", modelOrTool: "Forecast Engine", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "Risk Scoring", type: "agent", description: "Assesses audit risk, cash burn rate & liquidity runway", modelOrTool: "Risk AI", position: { x: 1750, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Insight Generator", type: "agent", description: "Synthesizes executive commentary on cost-reduction opportunities", modelOrTool: "Gemini 1.5 Pro", position: { x: 1920, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Executive Summary", type: "agent", description: "Drafts 1-page CFO memorandum with chart recommendations", modelOrTool: "Memo Generator", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Report Builder", type: "action", description: "Renders printable financial report preview and summary cards", modelOrTool: "PDF / HTML Generator", position: { x: 2260, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Review Required Branch", type: "decision", description: "Branches: High Anomaly Risk vs Approved Auto-Export", modelOrTool: "Audit Gate", position: { x: 2430, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "Export Results", type: "action", description: "Generates downloadable PDF audit report & clean CSV dataset", modelOrTool: "Exporter API", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "Audit Log", type: "output", description: "Records mathematical audit trail & compliance metadata", modelOrTool: "Audit Store", position: { x: 2770, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "fin-expense-audit",
      triggerPrompt: "Analyze monthly expenses",
      scenarioName: "Monthly Expense Audit & Anomaly Detection",
      outputPayload: {
        revenue: "$1,450,000",
        expenses: "$820,000",
        grossMargin: "68.2% (Target: > 65%)",
        cashFlowSummary: "Net Positive Cash Flow +$630,000 for current month",
        variance: "+14.2% OPEX increase vs Q2 baseline",
        detectedAnomalies: [
          "1. Duplicate SaaS charge: CloudScale Inc ($14,500 on 12-Jul)",
          "2. Uncategorized vendor wire: Apex Global Consulting ($28,000)",
        ],
        forecast: "Q4 Revenue Projected: $4.85M (+18% YoY growth)",
        riskFactors: "Moderate audit risk due to 2 unverified vendor wires",
        recommendedActions: "Issue refund dispute for duplicate $14.5k charge; mandate W-9 verification for Apex Global.",
      },
      metrics: [
        { label: "Revenue Processed", value: "$1.45M" },
        { label: "Gross Margin", value: "68.2%" },
        { label: "Anomalies Flagged", value: "2 Flagged" },
        { label: "Forecast Accuracy", value: "96.4%" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17"],
      logs: [
        { nodeId: "n1", nodeName: "File Upload Trigger", event: "Parsed input dataset Q3_Financial_Transactions.csv (1,240 rows)", status: "success", durationMs: 110 },
        { nodeId: "n3", nodeName: "Data Extraction", event: "Extracted 1,240 valid transaction records", status: "success", durationMs: 380 },
        { nodeId: "n7", nodeName: "Metric Calculation", event: "Computed Gross Margin: 68.2% ($630k Net Operating Income)", status: "success", durationMs: 250 },
        { nodeId: "n9", nodeName: "Anomaly Detection", event: "Flagged 2 outlier transactions exceeding 3 standard deviations", status: "success", durationMs: 410 },
        { nodeId: "n10", nodeName: "Forecast Model", event: "Executed SARIMAX forecasting model for Q4 revenue projection", status: "success", durationMs: 520 },
        { nodeId: "n16", nodeName: "Export Results", event: "Generated downloadable audit report PDF and cleaned CSV", status: "success", durationMs: 310 },
      ],
      generatedArtifact: {
        type: "financial",
        title: "Q3 Financial Analysis & Audit Memorandum",
        content: `FINANCIAL AUDIT & FORECAST REPORT
Period: Q3 2026
Prepared for: Executive Leadership Team

FINANCIAL OVERVIEW:
• Total Revenue: $1,450,000
• Operating Expenses: $820,000
• Gross Margin: 68.2% (+3.2% vs target)
• Net Cash Flow: +$630,000

ANOMALY AUDIT FLAGGED ITEMS:
1. [FLAGGED] Duplicate Charge: $14,500 paid to CloudScale Inc (12-Jul). Action: Dispute initiated.
2. [FLAGGED] Unverified Wire: $28,000 paid to Apex Global Consulting. Action: W-9 requested.

REVENUE FORECAST (Q4 2026):
• Projected Revenue: $4,850,000 (+18% YoY)
• Confidence Interval: 95% ($4.65M - $5.05M)`,
        downloadableFormat: "pdf",
      },
    },
  ],
};
