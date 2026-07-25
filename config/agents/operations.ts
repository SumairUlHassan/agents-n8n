import { AgentConfig } from "@/types/agents";

export const operationsAgentConfig: AgentConfig = {
  slug: "operations",
  title: "AI Operations Manager",
  subtitle: "Monitors business workflows, coordinates systems, resolves exceptions, and keeps operations moving automatically.",
  statusText: "Live — connected to operations pipeline",
  inputType: "hybrid",
  placeholder: "Select an operational event or type custom command...",
  submitLabel: "Run Operations Workflow",
  examplePrompts: [
    "Process a new customer order",
    "Resolve a delayed shipment",
    "Handle low inventory",
    "Generate today's operations report",
  ],
  workflowDescription: "Automated 20-node operations control center handling order intake, stock validation, supplier lookup, exception resolution, and ERP/Slack synchronization.",
  trustStatement: "Every operational event is validated, routed, synchronized across systems, and recorded in a central audit trail.",
  metricsLabels: ["Orders Processed", "Stock SLA", "Auto-Resolution", "ERP Sync Status"],
  workflowNodes: [
    { id: "n1", label: "Operations Trigger", type: "trigger", description: "Listens for webhook order events, ERP webhooks or manual triggers", modelOrTool: "Event Stream", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Event Classification", type: "agent", description: "Categorizes operational event (New Order, Delay, Stock Alert)", modelOrTool: "Event Classifier", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Customer Lookup", type: "action", description: "Retrieves customer account tier & SLA terms from database", modelOrTool: "CRM DB", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Order Validation", type: "action", description: "Verifies SKU availability, address validity & fraud score", modelOrTool: "Order Gate", position: { x: 560, y: 150 }, targetIds: ["n5"] },
    { id: "n5", label: "Inventory Check", type: "action", description: "Queries live warehouse inventory levels for requested SKUs", modelOrTool: "WMS DB API", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Stock Availability Branch", type: "decision", description: "Branches: In Stock vs Low Stock / Out of Stock", modelOrTool: "Stock Router", position: { x: 900, y: 150 }, targetIds: ["n7", "n9"] },
    { id: "n7", label: "Supplier Lookup", type: "action", description: "Identifies backup supplier with fastest lead time", modelOrTool: "Supplier DB", position: { x: 1070, y: 80 }, targetIds: ["n8"] },
    { id: "n8", label: "Purchase Request", type: "action", description: "Issues auto PO to primary supplier for restock", modelOrTool: "NetSuite PO API", position: { x: 1240, y: 80 }, targetIds: ["n9"] },
    { id: "n9", label: "Payment Verification", type: "action", description: "Verifies credit card payment capture or Net-30 invoice term", modelOrTool: "Stripe API", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Fulfillment Assignment", type: "action", description: "Assigns order picking task to nearest regional fulfillment hub", modelOrTool: "ShipStation API", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "Shipment Creation", type: "action", description: "Generates shipping label & tracking number (UPS / DHL)", modelOrTool: "EasyPost API", position: { x: 1750, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Delivery Tracking", type: "action", description: "Subscribes tracking webhook for real-time transit updates", modelOrTool: "Tracking Stream", position: { x: 1920, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Delay Detection", type: "agent", description: "Monitors carrier delays & predicts delivery SLA exceptions", modelOrTool: "Delay Predictor AI", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "Exception Resolution", type: "agent", description: "Executes auto-reroute or upgrades shipping tier for delayed items", modelOrTool: "Resolution AI", position: { x: 2260, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Customer Notification", type: "action", description: "Sends proactive SMS / Email tracking update to buyer", modelOrTool: "Twilio / SendGrid", position: { x: 2430, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "CRM Update", type: "action", description: "Updates Salesforce customer account timeline", modelOrTool: "Salesforce API", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "ERP Update", type: "action", description: "Synchronizes inventory balance & revenue ledger in ERP", modelOrTool: "SAP / NetSuite", position: { x: 2770, y: 150 }, targetIds: ["n18"] },
    { id: "n18", label: "Slack Alert", type: "action", description: "Posts status update to #ops-fulfillment channel", modelOrTool: "Slack Webhook", position: { x: 2940, y: 150 }, targetIds: ["n19"] },
    { id: "n19", label: "Daily Report", type: "agent", description: "Aggregates daily fulfillment KPIs into operational digest", modelOrTool: "Report Generator", position: { x: 3110, y: 150 }, targetIds: ["n20"] },
    { id: "n20", label: "Audit Log", type: "output", description: "Writes immutable execution log to operations database", modelOrTool: "Audit Engine", position: { x: 3280, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "ops-delay-resolution",
      triggerPrompt: "Resolve a delayed shipment",
      scenarioName: "Automated Delayed Shipment Reroute & Customer Notification",
      outputPayload: {
        orderStatus: "Order #ORD-94102 — Priority Reroute In Progress",
        inventoryAvailability: "100% (SKU-8821 available at Dallas Hub)",
        assignedSupplier: "FedEx Express Overland Logistics",
        shipmentStatus: "Original shipment delayed due to weather in Memphis; Rerouted from Dallas Hub",
        detectedExceptions: "Carrier Weather Delay Flag (+24 hours projected delay)",
        resolutionTaken: "Auto-upgraded to Overnight Air from secondary warehouse at $0 cost to customer",
        customerNotification: "SMS sent to customer: 'We upgraded your shipping to Overnight Air to ensure delivery tomorrow!'",
        operationsSummary: "Fulfillment SLA preserved. 0 human intervention required.",
      },
      metrics: [
        { label: "Orders Processed", value: "142" },
        { label: "Stock SLA", value: "99.8%" },
        { label: "Auto-Resolution", value: "94.5%" },
        { label: "ERP Sync Status", value: "Synced" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20"],
      skippedNodeIds: ["n7", "n8"],
      logs: [
        { nodeId: "n1", nodeName: "Operations Trigger", event: "Received delay notification for Order #ORD-94102", status: "success", durationMs: 40 },
        { nodeId: "n5", nodeName: "Inventory Check", event: "Confirmed secondary stock (120 units at Dallas Warehouse)", status: "success", durationMs: 210 },
        { nodeId: "n13", nodeName: "Delay Detection", event: "Memphis hub weather delay predicted to breach 24h SLA", status: "success", durationMs: 380 },
        { nodeId: "n14", nodeName: "Exception Resolution", event: "Automated decision: Upgrade to FedEx Overnight Air", status: "success", durationMs: 420 },
        { nodeId: "n15", nodeName: "Customer Notification", event: "Dispatched SMS notification to customer phone +1-555-0192", status: "success", durationMs: 190 },
        { nodeId: "n17", nodeName: "ERP Update", event: "Synced inventory balances in SAP NetSuite ERP", status: "success", durationMs: 280 },
      ],
      generatedArtifact: {
        type: "briefing",
        title: "Operations Incident & Exception Audit Summary",
        content: `OPERATIONS INCIDENT RESOLUTION REPORT
Incident ID: #INC-88392
Target Order: ORD-94102 (Customer: Acma Corp)

EVENT CHRONOLOGY:
1. 08:14:02 — Weather delay detected at FedEx Memphis Hub.
2. 08:14:03 — SLA breach risk flagged (> 24 hour delay).
3. 08:14:05 — Stock availability query: Dallas Warehouse has 120 units of SKU-8821.
4. 08:14:07 — Automated resolution: Reissued picking order at Dallas Hub via FedEx Air.
5. 08:14:09 — Customer notified via automated Twilio SMS.

SYSTEM IMPACT:
• Delivery SLA preserved (Delivery scheduled: Tomorrow 10:30 AM).
• Cost impact: $18.50 air upgrade fee absorbed by operational contingency fund.`,
        downloadableFormat: "txt",
      },
    },
  ],
};
