"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WorkflowNodeConfig } from "@/types/workflows";
import { WorkflowNode } from "./WorkflowNode";
import { Activity } from "lucide-react";

interface WorkflowPipelineProps {
  workflowNodes: WorkflowNodeConfig[];
  activeNodeId?: string;
  completedNodeIds?: string[];
  skippedNodeIds?: string[];
  workflowDescription: string;
  onSelectNode: (node: WorkflowNodeConfig) => void;
}

const nodeTypes = {
  workflowNode: WorkflowNode,
};

export function WorkflowPipeline({
  workflowNodes,
  activeNodeId,
  completedNodeIds = [],
  skippedNodeIds = [],
  workflowDescription,
  onSelectNode,
}: WorkflowPipelineProps) {
  const initialNodes: Node[] = useMemo(() => {
    return workflowNodes.map((n) => {
      let status: "idle" | "active" | "success" | "skipped" = "idle";
      if (n.id === activeNodeId) status = "active";
      else if (completedNodeIds.includes(n.id)) status = "success";
      else if (skippedNodeIds.includes(n.id)) status = "skipped";

      return {
        id: n.id,
        type: "workflowNode",
        position: n.position,
        data: {
          ...n,
          status,
          onSelectNode,
        },
      };
    });
  }, [workflowNodes, activeNodeId, completedNodeIds, skippedNodeIds, onSelectNode]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    workflowNodes.forEach((node) => {
      node.targetIds?.forEach((targetId) => {
        const isExecuted =
          completedNodeIds.includes(node.id) &&
          (completedNodeIds.includes(targetId) || targetId === activeNodeId);

        edges.push({
          id: `e-${node.id}-${targetId}`,
          source: node.id,
          target: targetId,
          animated: isExecuted || node.id === activeNodeId,
          style: {
            stroke: isExecuted ? "#6366F1" : "#334155",
            strokeWidth: isExecuted ? 2.5 : 1.5,
          },
        });
      });
    });
    return edges;
  }, [workflowNodes, activeNodeId, completedNodeIds]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const configNode = workflowNodes.find((n) => n.id === node.id);
      if (configNode) {
        onSelectNode(configNode);
      }
    },
    [workflowNodes, onSelectNode]
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B0F17] p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>Live Workflow Pipeline</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            {workflowDescription}
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-md border border-slate-800 shrink-0">
          Pan: Drag | Zoom: Scroll | Node Details: Click Node
        </div>
      </div>

      <div className="h-[360px] sm:h-[420px] w-full rounded-xl border border-slate-800/80 bg-[#090D16] overflow-hidden relative">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
        >
          <Background color="#1E293B" gap={20} size={1} />
          <Controls className="!top-3 !left-3 !bottom-auto" />
        </ReactFlow>
      </div>
    </div>
  );
}
