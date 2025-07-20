import { atom } from 'jotai'
import { Node, Edge, XYPosition } from '@xyflow/react';
import { NodeData } from '@/types';

// Define a proper Node type that includes required properties
export interface CustomNode extends Node<NodeData> {
  id: string;
  position: XYPosition;
  data: NodeData;
  type?: string;
}

export interface NodeEdgeState {
  name: string;
  id: string;
  nodes: CustomNode[];
  edges: Edge[];
  selectedNode: CustomNode | null;
}

const initialNodes: CustomNode[] = [
  {
    id: "n1",
    type: "text",
    position: { x: 0, y: 0 },
    data: { text: "Node 1", label: "Node 1" },
  },
  {
    id: "n2",
    type: "default",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
  },
];

const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

const statusAtom = atom({
  username: "",
  flowKeyName: "",
  hasChanges: false,
  isSaving: false,
  activeTab: 'nodes' as 'nodes' | 'settings',
});

const nodeEdgeAtom = atom<NodeEdgeState>({
  name: '',
  id: '',
  nodes: [],
  edges: [],
  selectedNode: null,
});

export {
  statusAtom,
  nodeEdgeAtom,
}