import { AgentConfig } from "@/types/agents";

export const executiveAssistantAgentConfig: AgentConfig = {
  slug: "executive-assistant",
  title: "AI Executive Assistant",
  subtitle: "Prioritizes communication, coordinates schedules, prepares briefings, and manages follow-up work.",
  statusText: "Live — connected to executive productivity pipeline",
  inputType: "hybrid",
  placeholder: "Enter request or select action...",
  submitLabel: "Run Assistant",
  examplePrompts: [
    "Summarize urgent emails",
    "Schedule a meeting next week",
    "Draft a reply to this client",
    "Prepare my daily briefing",
  ],
  actions: [
    "Summarize inbox",
    "Draft reply",
    "Schedule meeting",
    "Prepare daily briefing",
    "Create follow-up tasks",
  ],
  workflowDescription: "Automated 16-node executive productivity pipeline parsing emails, prioritizing threads, searching calendar openings, gating approvals, and generating daily briefings.",
  trustStatement: "Sensitive actions remain approval-gated while summaries, drafts, schedules, and tasks are fully traceable.",
  metricsLabels: ["Emails Processed", "Time Saved", "Action Items", "Conflicts Resolved"],
  workflowNodes: [
    { id: "n1", label: "Request Trigger", type: "trigger", kind: "trigger", description: "Receives executive command or automated scheduled trigger", modelOrTool: "Voice / Text Input", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Switch: Intent Classifier", type: "agent", kind: "if", description: "Classifies task intent: Inbox, Schedule, Draft, Briefing", modelOrTool: "Intent Classifier", position: { x: 220, y: 150 }, targetIds: ["n3"], targetLabels: { "n3": "valid request" } },
    { id: "n3", label: "Permission Check", type: "action", kind: "code", description: "Verifies authorization & policy scope for requested action", modelOrTool: "Policy Engine", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Loop Over Email Threads", type: "action", kind: "code", description: "Fetches recent inbox threads, unread emails, and high-priority flags", modelOrTool: "Gmail / Outlook API", position: { x: 560, y: 150 }, targetIds: ["n5"], targetLabels: { "n5": "thread batch" } },
    { id: "n5", label: "Priority Scoring", type: "agent", kind: "code", description: "Scores email urgency based on sender, keywords, and SLA", modelOrTool: "Priority AI", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Thread Summarization", type: "agent", kind: "code", description: "Compresses multi-turn email chains into key action items", modelOrTool: "Gemini Flash AI", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Calendar Search", type: "action", kind: "http", description: "Queries calendar for conflict-free availability slots", modelOrTool: "Google Calendar API", position: { x: 1070, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "Conflict Detection", type: "action", kind: "code", description: "Identifies double-bookings & timezone overlaps", modelOrTool: "Conflict Analyzer", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Time-Slot Selection", type: "agent", kind: "code", description: "Selects optimal 30-min window respecting executive focus time", modelOrTool: "Scheduler AI", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Draft Generator", type: "agent", kind: "code", description: "Drafts executive-toned response with proposed agenda", modelOrTool: "Gemini 1.5 Pro", position: { x: 1580, y: 150 }, targetIds: ["n11"] },
    { id: "n11", label: "IF: Executive Approval?", type: "decision", kind: "if", description: "Requires executive sign-off before sending email or booking", modelOrTool: "Human-in-the-Loop", position: { x: 1750, y: 150 }, targetIds: ["n12", "n13"], targetLabels: { "n12": "approved (calendar)", "n13": "approved (notion task)" } },
    { id: "n12", label: "Create Calendar Event", type: "action", kind: "http", description: "Creates calendar invite & attaches briefing notes", modelOrTool: "Calendar API", position: { x: 1920, y: 70 }, targetIds: ["n14"] },
    { id: "n13", label: "Create Tasks", type: "action", kind: "http", description: "Adds action items to Notion / Todoist workspace", modelOrTool: "Notion API", position: { x: 1920, y: 230 }, targetIds: ["n14"] },
    { id: "n14", label: "Update Notes", type: "action", kind: "http", description: "Appends thread summary to Executive Daily Log", modelOrTool: "Log Store", position: { x: 2090, y: 150 }, targetIds: ["n15"] },
    { id: "n15", label: "Send Notification", type: "action", kind: "http", description: "Delivers push notification summary to executive phone", modelOrTool: "Pushover / Slack", position: { x: 2260, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "Audit Log", type: "output", kind: "trigger", description: "Records timestamped audit entry of executive actions", modelOrTool: "Audit Engine", position: { x: 2430, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "ea-daily-briefing",
      triggerPrompt: "Prepare my daily briefing",
      scenarioName: "Executive Morning Intelligence Briefing",
      outputPayload: {
        priorityInboxSummary: "3 Urgent items require attention: 1) Board Deck review from CFO, 2) Partner agreement sign-off, 3) Client Q3 renewal.",
        draftedEmail: "Draft ready for CFO: 'Reviewed Q3 deck, financial projections look solid. Approved for distribution.'",
        recommendedMeetingTimes: "Optimal window for Partner Sync: Today at 3:30 PM EST (0 conflicts)",
        conflictWarnings: "Warning: 1:00 PM meeting overlaps with Product Strategy sync — suggested shift to 1:30 PM",
        dailyBriefing: "Schedule Overview: 4 meetings today (2.5 hrs total), 3 focus hours available between 2:00-5:00 PM.",
        followUpTasks: [
          "[High Priority] Sign Sequoia partner agreement before 5:00 PM",
          "[Medium] Review engineering hiring roadmap",
          "[Low] Approve travel expense report",
        ],
      },
      metrics: [
        { label: "Emails Processed", value: "34" },
        { label: "Time Saved", value: "1.8 Hours" },
        { label: "Action Items", value: "5 Tasks" },
        { label: "Conflicts Resolved", value: "1 Fixed" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16"],
      logs: [
        { nodeId: "n1", nodeName: "Request Trigger", event: "Triggered command 'Prepare my daily briefing'", status: "success", durationMs: 50 },
        { nodeId: "n4", nodeName: "Email Search", event: "Scanned 34 emails across primary inbox", status: "success", durationMs: 310 },
        { nodeId: "n5", nodeName: "Priority Scoring", event: "Scored 3 emails with urgency rating > 90/100", status: "success", durationMs: 240 },
        { nodeId: "n8", nodeName: "Conflict Detection", event: "Detected 1 calendar conflict at 1:00 PM EST", status: "success", durationMs: 190 },
        { nodeId: "n10", nodeName: "Draft Generator", event: "Generated reply draft for CFO approval", status: "success", durationMs: 380 },
        { nodeId: "n13", nodeName: "Create Tasks", event: "Pushed 3 high-priority tasks to Notion workspace", status: "success", durationMs: 210 },
        { nodeId: "n15", nodeName: "Send Notification", event: "Delivered morning briefing push alert", status: "success", durationMs: 120 },
      ],
      generatedArtifact: {
        type: "briefing",
        title: "Executive Daily Intelligence Briefing",
        content: `EXECUTIVE DAILY BRIEFING — MONDAY
Prepared by AI Executive Assistant

CALENDAR SUMMARY:
• 09:30 AM — Leadership Standup (30m)
• 11:00 AM — Q3 Financial Review w/ CFO (45m)
• 01:30 PM — Product Strategy Sync (Shifted from 1:00 PM to eliminate conflict)
• 03:30 PM — Partner Sync (30m)

URGENT INBOX ACTION ITEMS:
1. CFO Board Deck: Draft reply prepared for review.
2. Sequoia Partner Agreement: Pending signature before 5:00 PM.
3. Client Renewal (ApexFlow): Terms approved.

GENERATED TASK LIST:
[ ] Sign Sequoia Partner Agreement
[ ] Approve Engineering Hiring Plan
[ ] Confirm Thursday Demo Slot`,
        downloadableFormat: "txt",
      },
    },
  ],
};
