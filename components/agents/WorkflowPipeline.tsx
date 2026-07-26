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
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WorkflowNodeConfig } from "@/types/workflows";
import { WorkflowNode } from "./WorkflowNode";
import { Wrench } from "lucide-react";

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
    return workflowNodes.map((n, index) => {
      let status: "idle" | "active" | "success" | "skipped" = "idle";
      if (n.id === activeNodeId) status = "active";
      else if (completedNodeIds.includes(n.id)) status = "success";
      else if (skippedNodeIds.includes(n.id)) status = "skipped";

      // Scale positions for clean n8n node layout with 50px horizontal gaps and distinct branch Y levels
      const posX = n.position.x > 0 ? n.position.x * 1.25 : index * 200 + 40;
      const posY = n.position.y || 150;

      return {
        id: n.id,
        type: "workflowNode",
        position: { x: posX, y: posY },
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

        const edgeLabel = node.targetLabels?.[targetId];

        edges.push({
          id: `e-${node.id}-${targetId}`,
          source: node.id,
          target: targetId,
          type: "smoothstep",
          label: edgeLabel,
          labelStyle: { fill: "#475569", fontSize: 10, fontWeight: 600 },
          labelBgStyle: { fill: "#ffffff", fillOpacity: 0.95, rx: 4, ry: 4 },
          labelBgPadding: [4, 2],
          animated: isExecuted || node.id === activeNodeId,
          style: {
            stroke: isExecuted ? "#1f7ae0" : "#c3ccd6",
            strokeWidth: isExecuted ? 2.5 : 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isExecuted ? "#1f7ae0" : "#c3ccd6",
            width: 12,
            height: 12,
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
    <div className="rounded-2xl border border-[#dde3ea] bg-white p-5 shadow-sm space-y-4">
      {/* Header & Legend */}
      <div className="space-y-3 border-b border-[#dde3ea] pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#1a2530] flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#1f7ae0]" />
              <span>Live Workflow Pipeline</span>
            </h2>
            <p className="text-xs text-[#667080] mt-0.5 max-w-2xl leading-relaxed">
              {workflowDescription}
            </p>
          </div>
        </div>

        {/* n8n Node Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#667080] pt-1">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#ff6b8a]" />
            <span>Trigger / Response</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#a986ff]" />
            <span>Code</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#4fb3ff]" />
            <span>HTTP Request</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#2ecf9a]" />
            <span>If / Branch / Switch</span>
          </span>
        </div>
      </div>

      {/* Viewport Canvas */}
      <div className="h-[380px] sm:h-[440px] w-full rounded-xl border border-[#dde3ea] bg-[#eef1f5] overflow-hidden relative shadow-inner">
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
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="!top-3 !right-3 !left-auto !bottom-auto" />
        </ReactFlow>

        {/* Hint Tag */}
        <div className="absolute bottom-3 left-3 z-10 text-[11px] font-sans text-[#667080] bg-white/90 border border-[#dde3ea] px-3 py-1 rounded-md shadow-sm">
          Drag to pan · Scroll to zoom · Click a node for details
        </div>
      </div>
    </div>
  );
}
