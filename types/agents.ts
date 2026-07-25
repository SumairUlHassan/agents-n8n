import { WorkflowNodeConfig, ExecutionLogEntry } from "./workflows";

export type InputType = "chat" | "form" | "upload" | "hybrid";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "file" | "url";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  defaultValue?: string;
}

export interface DemoScenario {
  id: string;
  triggerPrompt: string;
  formValues?: Record<string, string>;
  scenarioName: string;
  outputPayload: Record<string, unknown>;
  metrics: Array<{ label: string; value: string | number }>;
  executedNodeIds: string[];
  skippedNodeIds?: string[];
  logs: Array<{ nodeId: string; nodeName: string; event: string; status: "success" | "warning" | "failed" | "skipped"; durationMs: number }>;
  generatedArtifact?: {
    type: "email" | "candidate" | "briefing" | "financial" | "proposal" | "campaign" | "research" | "data";
    title: string;
    content: string;
    downloadableFormat?: "pdf" | "csv" | "txt";
    metadata?: Record<string, string | number>;
  };
}

export interface AgentConfig {
  slug: string;
  title: string;
  subtitle: string;
  statusText: string;
  inputType: InputType;
  placeholder?: string;
  submitLabel: string;
  examplePrompts: string[];
  fields?: FormField[];
  actions?: string[];
  supportedFiles?: string[];
  workflowDescription: string;
  trustStatement: string;
  metricsLabels: string[];
  workflowNodes: WorkflowNodeConfig[];
  demoScenarios: DemoScenario[];
}

export interface AgentExecutionResponse {
  success: boolean;
  executionId: string;
  agent: string;
  scenario?: string;
  message?: string;
  output: Record<string, unknown>;
  metrics?: Array<{ label: string; value: string | number }>;
  logs: ExecutionLogEntry[];
  nodeExecutions: Array<{
    nodeId: string;
    status: "idle" | "active" | "success" | "warning" | "failed" | "skipped";
    input?: unknown;
    output?: unknown;
    duration?: number;
  }>;
}
