"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { nodeEdgeAtom, NodeEdgeState, statusAtom } from "@/utils/store";
import { checkForDisconnectedNodes, generateUUIDv4 } from "@/utils";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [status, setStatus] = useAtom(statusAtom);
  const [name, setName] = useState<string>("");
  const [savedFlows, setSavedFlows] = useState<NodeEdgeState[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<"newFlow" | "loadFlow" | null>(
    null
  );
  const [nodeEdge, setNodeEdge] = useAtom(nodeEdgeAtom);
  const hasChanges = status.hasChanges;
  const isSaving = status.isSaving;

  const saveFlow = () => {
    try {
      const disconnectedNodes = checkForDisconnectedNodes(
        nodeEdge.nodes,
        nodeEdge.edges
      );
      if (disconnectedNodes.length > 0) {
        toast.error(`Cannot save flow: Nodes are disconnected`, {
          style: {
            borderRadius: "10px",
            background: "#ee000073",
            color: "#000",
          },
        });
        return;
      }
      const allFlows = localStorage.getItem(status.flowKeyName);
      console.log(allFlows, "allFlows");
      const flows = allFlows ? JSON.parse(allFlows) : [];
      console.log(flows, "flows", nodeEdge.id);
      const flow = flows.find((flow: NodeEdgeState) => {
        console.log(flow.id, nodeEdge.id);
        return flow.id === nodeEdge.id;
      });
      console.log(flow, "flow");
      if (flow) {
        flow.nodes = nodeEdge.nodes;
        flow.edges = nodeEdge.edges;
      } else {
        flows.push({
          id: nodeEdge.id,
          nodes: nodeEdge.nodes,
          edges: nodeEdge.edges,
        });
      }
      localStorage.setItem(status.flowKeyName, JSON.stringify(flows));
      setStatus({ ...status, hasChanges: false, isSaving: false });
      toast.success("Flow saved successfully", {
        style: {
          borderRadius: "10px",
          background: "#00ee0873",
          color: "#000",
        },
      });
    } catch (error) {
      toast.error("Failed to save flow");
      console.error("Failed to save flow:", error);
    }
  };
  const startNewFlow = () => {
    const newFlow = {
      name: name.trim() || "Untitled Flow",
      id: generateUUIDv4(),
      nodes: [],
      edges: [],
      selectedNode: null,
    };

    if (
      hasChanges &&
      !window.confirm(
        "Are you sure you want to start a new flow? Any unsaved changes will be lost."
      )
    ) {
      return; // User cancelled the action
    }

    // Save to localStorage
    try {
      const savedFlows = JSON.parse(
        localStorage.getItem(status.flowKeyName) || "[]"
      );
      savedFlows.push(newFlow);
      localStorage.setItem(status.flowKeyName, JSON.stringify(savedFlows));
    } catch (error) {
      console.error("Failed to save new flow:", error);
    }

    // Update state
    setNodeEdge(newFlow);
    setStatus({ ...status, hasChanges: false });
    setOpenDialog(null);
    setIsDropdownOpen(false);
    setName(""); // Reset the name input
  };

  useEffect(() => {
    try {
      const username = localStorage.getItem("biteSpeedUsername");
      if (username) {
        setStatus({
          ...status,
          username: username,
          flowKeyName: `biteSpeedFlow-${username}`,
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to load username:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const flows = JSON.parse(
        localStorage.getItem(status.flowKeyName) || "[]"
      );
      setSavedFlows(flows);
    } catch (error) {
      console.error("Failed to load saved flows:", error);
      setSavedFlows([]);
    }
  }, [status.flowKeyName, nodeEdge]);

  return (
    <nav className="flex justify-between items-center p-2 px-4 border-b border-gray-200 gap-2">
      <div className="flex items-center gap-2">
        <RxAvatar className="w-6 h-6" />
        <span className="font-medium">{status.username}</span>

        {savedFlows.length > 0 ? (
          <div className="relative ml-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
            >
              {nodeEdge?.name || "Select a flow"}
              <FiChevronDown
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="p-2 border-b border-gray-100">
                  <button
                    onClick={() => setOpenDialog("newFlow")}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    <FiPlus className="w-4 h-4" />
                    Create New Flow
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {savedFlows.map((flow) => (
                    <div
                      key={flow.id}
                      onClick={() => {
                        setNodeEdge((prevNodeEdge) => ({
                          ...prevNodeEdge,
                          nodes: flow.nodes,
                          edges: flow.edges,
                          name: flow.name,
                          id: flow.id,
                          selectedNode: flow.selectedNode || null,
                        }));
                        setOpenDialog(null);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${
                        flow.id === nodeEdge?.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <span className="truncate">{flow.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedFlows = savedFlows.filter(
                            (f: NodeEdgeState) => f.id !== flow.id
                          );
                          console.log(updatedFlows, "updatedFlows");
                          localStorage.setItem(
                            status.flowKeyName,
                            JSON.stringify(updatedFlows)
                          );
                          if (updatedFlows.length > 0) {
                            setNodeEdge({
                              nodes: updatedFlows[0].nodes,
                              edges: updatedFlows[0].edges,
                              name: updatedFlows[0].name,
                              id: updatedFlows[0].id,
                              selectedNode:
                                updatedFlows[0].selectedNode || null,
                            });
                          } else {
                            setNodeEdge({
                              nodes: [],
                              edges: [],
                              name: "",
                              id: "",
                              selectedNode: null,
                            });
                          }
                          setOpenDialog(null);
                          setIsDropdownOpen(false);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                        title="Delete flow"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setOpenDialog("newFlow")}
            className="ml-4 flex items-center gap-2 px-3 py-1.5 text-white bg-[#00d1ee] rounded-md hover:bg-[#00b8d4] cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            Create Your First Flow
          </button>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {savedFlows.length > 0 && (
          <button
            disabled={!hasChanges || isSaving}
            onClick={saveFlow}
            className={
              "bg-[#00d1ee] text-white px-3 py-1.5 rounded-md hover:bg-[#00b8d4] transition-colors cursor-pointer " +
              (!hasChanges || isSaving ? "opacity-50 cursor-not-allowed" : "")
            }
          >
            Save Changes
          </button>
        )}
      </div>
      <Modal
        isOpen={openDialog === "newFlow"}
        onClose={() => setOpenDialog(null)}
        title="Create New Flow"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00d1ee] focus:border-transparent transition-all duration-200"
              placeholder="Enter flow name"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setOpenDialog(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={startNewFlow}
              disabled={!name.trim()}
              className="px-4 py-2 bg-[#00d1ee] text-white font-medium rounded hover:bg-[#00b8d4] disabled:opacity-50"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
