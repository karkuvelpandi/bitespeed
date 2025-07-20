"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import NodesPanel from "./panels/NodesPanel";
import SettingsPanel from "./panels/SettingsPanel";
import { useAtom } from "jotai";
import { statusAtom } from "@/utils/store";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TextNode from "./nodes/TextNode";
import Tabs from "./ui/Tabs";
import { nodeEdgeAtom } from "@/utils/store";
import MessageNode from "./nodes/MessageNode";
import NoFlowPanel from "./ui/NoFlowPanel";

const FlowBuilder = () => {
  const [status, setStatus] = useAtom(statusAtom);
  const [nodeEdge, setNodeEdge] = useAtom(nodeEdgeAtom);

  // Node Type Definitions
  const nodeTypes = {
    text: TextNode,
    message: MessageNode,
    // Add more node types here as needed
  };

  const onNodesChange = useCallback(
    (changes) =>
      setNodeEdge((prevNodeEdge) => {
        if (!status.hasChanges) setStatus({ ...status, hasChanges: true });
        return {
          ...prevNodeEdge,
          nodes: applyNodeChanges(changes, prevNodeEdge.nodes),
        };
      }),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setNodeEdge((prevNodeEdge) => {
        if (!status.hasChanges) setStatus({ ...status, hasChanges: true });
        return {
          ...prevNodeEdge,
          edges: applyEdgeChanges(changes, prevNodeEdge.edges),
        };
      }),
    []
  );
  const onConnect = useCallback(
    (params) =>
      setNodeEdge((prevNodeEdge) => {
        if (!status.hasChanges) setStatus({ ...status, hasChanges: true });
        return {
          ...prevNodeEdge,
          edges: addEdge(params, prevNodeEdge.edges),
        };
      }),
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX, y: event.clientY };

      // Create a new node
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
          text: "Hello BiteSpeed 👋!",
        },
      };
      console.log(newNode);
      if (!status.hasChanges) setStatus({ ...status, hasChanges: true });
      setNodeEdge((prevNodes) => ({
        ...prevNodes,
        nodes: [...prevNodes.nodes, newNode],
      }));
    },
    [setNodeEdge, setStatus]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSelectNode = (node: Node) => {
    setStatus({ ...status, activeTab: "settings" });
    console.log(node);
    setNodeEdge((prevNodeEdge) => ({ ...prevNodeEdge, selectedNode: node }));
    console.log("Node is selected ");
  };

  // Load flows from localStorage on mount
  useEffect(() => {
    try {
      const flows = JSON.parse(
        localStorage.getItem(status.flowKeyName) || "[]"
      );
      if (flows.length > 0) {
        setNodeEdge(flows[flows.length - 1]);
      }
    } catch (error) {
      console.error("Failed to load flows:", error);
    }
  }, []);

  const savedFlows = useMemo(() => {
    try {
      const flows = JSON.parse(
        localStorage.getItem(status.flowKeyName) || "[]"
      );
      return flows;
    } catch (error) {
      console.error("Failed to load saved flows:", error);
      return [];
    }
  }, [nodeEdge, status]);

  console.log(nodeEdge);
  return (
    <div className="flex h-[calc(100vh-56px)] w-full">
      {/* Main Flow Area */}
      <div className="flex justify-between flex-1 h-[calc(100vh-56px)] border border-gray-100 bg-transparent [background-image:radial-gradient(#00d1ee_0.45px,transparent_0.45px),radial-gradient(#00d1ee_0.45px,#ffffff_0.45px)] [background-size:18px_18px] [background-position:0_0,9px_9px]">
        {savedFlows.length > 0 ? (
          <ReactFlow
            nodes={nodeEdge.nodes}
            edges={nodeEdge.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={(event, node) => onSelectNode(node)}
            fitView
          />
        ) : (
          <NoFlowPanel />
        )}
      </div>

      {/* Sidebar Panel */}
      <div className="w-80 border-l border-gray-200 bg-transparent flex flex-col h-full">
        <Tabs />
        <div className="flex-1 overflow-y-auto p-4">
          {status.activeTab === "nodes" && <NodesPanel />}
          {status.activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
