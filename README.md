# Elixr Co. — Multi-Agent AI Automation Demo Platform

A complete, production-ready portfolio platform of 10 AI-agent demonstrations built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **React Flow (`@xyflow/react`)**.

Every agent page reproduces the exact visual language, layout structure, typography, dark mode styling, and interaction model of the reference master design system (`https://n8n-demos-eight.vercel.app/rag-chat-demo`).

---

## 🌟 Included Agent Demos

| # | Agent Name | Route | Input Type | Workflow Nodes |
|---|------------|-------|------------|----------------|
| 1 | **AI SDR Agent** | `/agents/sdr` | Hybrid Form & Chat | 20 Nodes |
| 2 | **Omnichannel Customer Support Agent** | `/agents/support` | Chat RAG | 16 Nodes |
| 3 | **AI Recruiting Agent** | `/agents/recruiting` | Hybrid Upload & Form | 19 Nodes |
| 4 | **Executive Assistant Agent** | `/agents/executive-assistant` | Chat & Action Selector | 16 Nodes |
| 5 | **AI Financial Analyst Agent** | `/agents/financial-analyst` | File Upload & Form | 17 Nodes |
| 6 | **AI Operations Manager** | `/agents/operations` | Scenario Selector | 20 Nodes |
| 7 | **AI Proposal Generator** | `/agents/proposal-generator` | Form & URL Input | 19 Nodes |
| 8 | **AI Marketing Agent** | `/agents/marketing` | Campaign Form | 19 Nodes |
| 9 | **Autonomous Research Agent** | `/agents/research` | Query & Controls | 18 Nodes |
| 10 | **AI Data Analyst Agent** | `/agents/data-analyst` | File Upload & Natural Lang | 18 Nodes |

- **Agent Directory**: `/agents`
- **Master Reference Preservation Route**: `/rag-chat-demo` (renders Support Agent RAG demo)

---

## ⚡ Key Features

- **Master Design System**: Dark-themed (`#0B0F17`), high-density layout, glowing neon status indicators, glassmorphic cards, and custom typography.
- **Interactive React Flow Canvas**: n8n-style node execution with live node status glows (`idle`, `active`, `success`, `skipped`), animated edge connections, zoom controls, fit view, and node click details modal.
- **Dual Execution Modes**:
  - **Mode 1 (Simulated Portfolio Mode)**: Works out of the box with zero external API key requirements. Emulates step-by-step multi-second execution, streams live execution logs, updates KPI metric cards, and generates downloadable business artifacts (Emails, Reports, Proposals, Audits).
  - **Mode 2 (Live Webhook Mode)**: Connects each agent to a live n8n webhook endpoint via environment variables (`NEXT_PUBLIC_<AGENT>_WEBHOOK_URL`). Includes auto-fallback to simulated mode if webhooks are unconfigured or fail.
- **Generated Business Artifacts**: Instant in-page previews for generated sales emails, candidate evaluation scorecards, financial memos, proposals, marketing content calendars, research papers, and data science reports with PDF/CSV download and copy buttons.

---

## 🚀 Quick Start & Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production (Vercel-ready)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🛠️ Environment Variables Configuration

Copy `.env.example` to `.env.local` to connect live n8n webhooks:

```bash
NEXT_PUBLIC_SDR_WEBHOOK_URL=https://your-n8n.com/webhook/sdr
NEXT_PUBLIC_SUPPORT_WEBHOOK_URL=https://your-n8n.com/webhook/support
# ... see .env.example for full list
```

---

## 📁 Project Architecture

```
app/
  agents/
    page.tsx              # Agent Directory Page (/agents)
    [slug]/
      page.tsx            # Dynamic Agent Demo Page (/agents/[slug])
  api/
    agents/
      [slug]/
        route.ts          # Unified API Endpoint for Executions
  rag-chat-demo/
    page.tsx              # Preserved Master Design Route (/rag-chat-demo)
components/
  agents/
    AgentDemoLayout.tsx   # Master Layout Wrapper
    AgentHeader.tsx       # Title, Subtitle, Live Status, Prompts
    AgentInputPanel.tsx   # Contextual Form/Chat/Upload Inputs
    WorkflowPipeline.tsx  # React Flow Interactive Canvas
    WorkflowNode.tsx      # Custom n8n Node Component
    NodeDetailsModal.tsx  # Node Click Detail Drawer
    ExecutionLog.tsx      # Real-time Execution Audit Stream
    AgentMetrics.tsx      # KPI Metrics Cards Grid
    AgentOutputPanel.tsx  # Response Output Container
    ArtifactPreview.tsx   # Downloadable Document Viewer
    AgentSwitcher.tsx     # Header Dropdown & Navigation Bar
config/
  agents/                 # 10 Agent Configuration Files
lib/
  agent-simulator/        # Simulation Engine & Scenarios
  webhooks/               # Live n8n Webhook Client
types/                    # TypeScript Contracts & Interfaces
```
