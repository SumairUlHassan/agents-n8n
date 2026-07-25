import { AgentConfig } from "@/types/agents";

export const dataAnalystAgentConfig: AgentConfig = {
  slug: "data-analyst",
  title: "AI Data Analyst",
  subtitle: "Cleans uploaded datasets, answers business questions, identifies patterns, and produces executive-ready analysis.",
  statusText: "Live — connected to analytics pipeline",
  inputType: "upload",
  placeholder: "Upload CSV, XLSX, JSON dataset or enter natural language question...",
  submitLabel: "Analyze Data",
  examplePrompts: [
    "Find the biggest sales drivers",
    "Analyze customer churn",
    "Detect unusual values",
    "Create an executive summary",
  ],
  fields: [
    { id: "naturalQuestion", label: "Natural Language Question", type: "text", placeholder: "e.g. Which customer segment generated the highest net margin last quarter?", defaultValue: "Identify top sales drivers, churn probability factors, and anomalous revenue dips in Q3 dataset." },
    { id: "datasetFile", label: "Dataset File (CSV / XLSX / JSON)", type: "file" },
    { id: "dataCleaningLevel", label: "Data Cleaning", type: "select", options: ["Auto-Clean (Fix missing values & outliers)", "Strict Validation", "Raw Analysis"], defaultValue: "Auto-Clean (Fix missing values & outliers)" },
    { id: "segmentationFocus", label: "Segmentation Focus", type: "select", options: ["Customer Tier", "Geographic Region", "Product Category", "Cohort / Tenure"], defaultValue: "Product Category" },
  ],
  supportedFiles: ["CSV", "XLSX", "JSON"],
  workflowDescription: "Automated 18-node data science pipeline performing schema detection, data profiling, missing-value imputation, statistical correlation, anomaly detection, customer segmentation, and chart visualization generation.",
  trustStatement: "Every insight is derived from the uploaded dataset with visible cleaning steps, metrics, assumptions, and analysis logs.",
  metricsLabels: ["Rows Analyzed", "Issues Fixed", "Patterns Found", "Anomalies Flagged"],
  workflowNodes: [
    { id: "n1", label: "Dataset Upload", type: "trigger", description: "Receives raw dataset file (CSV/XLSX/JSON) and user query", modelOrTool: "Data Ingest Gate", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "File Validation", type: "action", description: "Validates column headers, delimiters, and file integrity", modelOrTool: "Validator Engine", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Schema Detection", type: "action", description: "Infers data types (numeric, categorical, datetime, boolean)", modelOrTool: "Schema Detector", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Data Profiling", type: "action", description: "Calculates null percentages, distributions, mean, std dev", modelOrTool: "Pandas Profiler AI", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Missing-Value Detection", type: "action", description: "Identifies null values and blank records", modelOrTool: "Null Inspector", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Data Cleaning", type: "action", description: "Imputes missing values with median/mode & drops corrupted rows", modelOrTool: "Auto-Cleaner", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Type Conversion", type: "action", description: "Casts strings to timestamps & float amounts", modelOrTool: "Type Converter", position: { x: 1070, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "Statistical Analysis", type: "action", description: "Computes Pearson correlation matrix & ANOVA variance", modelOrTool: "Stats Engine", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Query Interpretation", type: "agent", description: "Translates natural language question into SQL / Pandas filter", modelOrTool: "NL2SQL AI", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Metric Selection", type: "action", description: "Extracts key performance indicators relevant to inquiry", modelOrTool: "KPI Selector", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "Pattern Detection", type: "agent", description: "Discovers significant trends, growth spikes & correlations", modelOrTool: "Pattern AI", position: { x: 1750, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Anomaly Detection", type: "agent", description: "Detects statistical outliers (> 3 std dev above mean)", modelOrTool: "Anomaly AI", position: { x: 1920, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Segmentation", type: "action", description: "Clusters rows into High Value, At-Risk & Core segments", modelOrTool: "K-Means Engine", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Insight Generation", type: "agent", description: "Synthesizes executive business takeaways & action items", modelOrTool: "Gemini 1.5 Pro", position: { x: 2260, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Visualization Selection", type: "agent", description: "Selects optimal bar, line & pie charts to display insights", modelOrTool: "Chart Config AI", position: { x: 2430, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "Executive Summary", type: "agent", description: "Renders interactive analytics dashboard layout", modelOrTool: "Dashboard Generator", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "Export Analysis", type: "action", description: "Generates downloadable summary PDF & CSV clean dataset", modelOrTool: "Exporter API", position: { x: 2770, y: 150 }, targetIds: ["n18"] },
    { id: "n18", label: "Audit Log", type: "output", description: "Logs data transformation steps & code execution for auditability", modelOrTool: "Audit Engine", position: { x: 2940, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "da-sales-drivers",
      triggerPrompt: "Find the biggest sales drivers",
      scenarioName: "Sales Driver & Churn Factors Analysis",
      outputPayload: {
        datasetOverview: "Q3_Customer_Sales_Data.csv (5,420 rows, 16 columns)",
        rowCountAndColumns: "5,420 rows | 16 columns (Cleaned: 12 missing values imputed)",
        missingValues: "12 missing values detected in 'Customer_Tenure' (Imputed with median 14.5 months)",
        dataQualityIssues: "0 critical errors remaining after auto-cleaning",
        keyMetrics: "Total Revenue: $2,840,000 | Avg Deal Size: $14,200 | Retention Rate: 91.4%",
        importantRelationships: "Strongest Sales Driver: Enterprise Add-on Modules (r = 0.84 correlation with LTV)",
        outliers: "3 Outlier transactions (> $120k single-purchase anomalies flagged)",
        segments: "High Growth: Mid-Market SaaS (38% of total volume, +24% YoY growth)",
        businessInsights: [
          "1. Accounts using 3+ integrated modules have a 98% retention rate vs 74% for single-module users.",
          "2. Support response delay > 4 hours increases 90-day churn probability by 3.2x.",
          "3. Q3 top revenue driver was the Enterprise Automation Module ($1.12M total).",
        ],
        suggestedNextActions: "Launch targeted upsell campaign for single-module accounts offering a free trial of Enterprise Automation.",
        chartPreviews: "Rendered Revenue by Category Bar Chart & Churn Correlation Scatter Plot",
        downloadableAnalysisSummary: "Full Data Executive Summary & Cleaned Dataset Ready for Download",
      },
      metrics: [
        { label: "Rows Analyzed", value: "5,420" },
        { label: "Issues Fixed", value: "12 Imputed" },
        { label: "Patterns Found", value: "4 Insights" },
        { label: "Anomalies Flagged", value: "3 Outliers" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18"],
      logs: [
        { nodeId: "n1", nodeName: "Dataset Upload", event: "Uploaded Q3_Customer_Sales_Data.csv (5,420 rows)", status: "success", durationMs: 120 },
        { nodeId: "n4", nodeName: "Data Profiling", event: "Completed statistical distribution profiling", status: "success", durationMs: 340 },
        { nodeId: "n6", nodeName: "Data Cleaning", event: "Imputed 12 null entries using median value imputation", status: "success", durationMs: 210 },
        { nodeId: "n8", nodeName: "Statistical Analysis", event: "Calculated Pearson correlation matrix across 16 variables", status: "success", durationMs: 450 },
        { nodeId: "n11", nodeName: "Pattern Detection", event: "Identified strong correlation (r=0.84) between modules & LTV", status: "success", durationMs: 380 },
        { nodeId: "n16", nodeName: "Executive Summary", event: "Compiled interactive analytics dashboard preview", status: "success", durationMs: 310 },
      ],
      generatedArtifact: {
        type: "data",
        title: "Executive Data Science & Insights Report",
        content: `EXECUTIVE DATA ANALYSIS REPORT
Dataset: Q3 Customer Sales Data (5,420 rows)
Analyzed by: AI Data Analyst

KEY FINDINGS & METRICS:
• Total Revenue Analyzed: $2,840,000
• Average Deal Value: $14,200
• Primary Revenue Driver: Enterprise Automation Module (42% of revenue)

STATISTICAL CORRELATION:
• Module Adoption vs LTV: r = 0.84 (Strong positive correlation)
• Support Delay vs Churn: r = 0.71 (High risk factor)

RECOMMENDED ACTIONS:
1. Focus expansion efforts on accounts with 1-2 modules.
2. Institute automated SLA alert when support ticket age exceeds 2 hours.

CLEANED DATASET PREVIEW:
5,420 rows processed, 0 remaining nulls. CSV available for download.`,
        downloadableFormat: "csv",
      },
    },
  ],
};
