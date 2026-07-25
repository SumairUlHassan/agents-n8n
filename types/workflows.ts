export type NodeStatus = "idle" | "active" | "success" | "warning" | "failed" | "skipped";
export type NodeType = "trigger" | "action" | "decision" | "agent" | "output";

export interface WorkflowNodeConfig {
  id: string;
  label: string;
  type: NodeType;
  status?: NodeStatus;
  description: string;
  modelOrTool: string;
  inputSample?: Record<string, unknown>;
  outputSample?: Record<string, unknown>;
  position: { x: number; y: number };
  targetIds?: string[]; // Connections to next nodes
}

export interface ExecutionLogEntry {
  timestamp: string;
  nodeId: string;
  nodeName: string;
  event: string;
  status: NodeStatus;
  duration?: number;
}
