import { nodeEdgeAtom } from "@/utils/store";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { Node as FlowNode, XYPosition, applyNodeChanges } from "@xyflow/react";
import { NodeData } from "@/types";

// Define a proper Node type that includes required properties
export interface CustomNode extends FlowNode<NodeData> {
  id: string;
  position: XYPosition;
  data: NodeData;
}

const SettingsPanel: React.FC = () => {
  const [nodeEdge, setNodeEdge] = useAtom(nodeEdgeAtom);
  const [text, setText] = useState(nodeEdge?.selectedNode?.data?.text || "");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!nodeEdge.selectedNode) return;
      setText(e.target.value);
    },
    [nodeEdge?.selectedNode]
  );

  const handleSave = () => {
    if (!nodeEdge.selectedNode) return;
    const updatedNode = {
      ...nodeEdge?.selectedNode,
      data: { ...nodeEdge?.selectedNode?.data, text: text },
    };
    // eslint-disable-next-line
    setNodeEdge((prevNodeEdge: any) => ({
      ...prevNodeEdge,
      nodes: [...prevNodeEdge.nodes, updatedNode],
      selectedNode: updatedNode,
    }));

    console.log(
      nodeEdge?.selectedNode?.data,
      text,
      "nodeEdge?.selectedNode?.data"
    );
  };

  useEffect(() => {
    if (!nodeEdge.selectedNode) return;
    setText(nodeEdge?.selectedNode?.data?.text || "");
  }, [nodeEdge?.selectedNode]);

  const selectedNode = nodeEdge?.selectedNode as CustomNode | null;

  console.log(selectedNode, "selectedNode");

  if (!selectedNode) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Select a node to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {selectedNode?.type === "text" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Text
            </label>
            <input
              type="text"
              name="text"
              value={text}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter node label"
            />
            <button
              onClick={handleSave}
              className="mt-2 px-4 py-2 bg-[#00d1ee] text-white rounded-md hover:bg-[#00d1ee]/80 transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {
        selectedNode?.type === "message" && (
          <div className=" bg-amber-50 p-4 rounded-md">
            <div className="space-y-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
              ⓘ  Message Trigger
              </label>
              <p>Define action to be taken when this node is triggered</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default SettingsPanel;
