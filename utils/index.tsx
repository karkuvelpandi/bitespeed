import { Edge } from "@xyflow/react";
import { CustomNode } from "./store";

export const debounce = (func, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const generateUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const checkForDisconnectedNodes = (
  nodes: CustomNode[],
  edges: Edge[]
): string[] => {
  const connectedNodeIds = new Set<string>();
  const disconnectedNodeIds: string[] = [];

  // Add all target nodes (nodes that have incoming edges)
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.target);
  });

  // If there are no edges, all nodes except the first are disconnected
  if (edges.length === 0 && nodes.length > 1) {
    return nodes.slice(1).map((node) => node.id);
  }

  // Check each node
  nodes.forEach((node) => {
    // A node is connected if:
    // 1. It's the first node OR
    // 2. It has an incoming edge
    // 3. It has an outgoing edge (unless it's the last node)
    const hasIncomingEdge = connectedNodeIds.has(node.id);
    const hasOutgoingEdge = edges.some((edge) => edge.source === node.id);

    // If it's not the first node and has no incoming edges, it's disconnected
    if (node.id !== nodes[0].id && !hasIncomingEdge) {
      disconnectedNodeIds.push(node.id);
    }
    // If it's not the last node and has no outgoing edges, it's disconnected
    else if (node.id !== nodes[nodes.length - 1].id && !hasOutgoingEdge) {
      disconnectedNodeIds.push(node.id);
    }
  });

  return disconnectedNodeIds;
};
