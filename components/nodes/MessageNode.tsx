import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { BiMessageRoundedDetail } from "react-icons/bi";

const MessageNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center space-x-2 flex-col">
        <BiMessageRoundedDetail className="!mr-0 w-6 h-6"/>
        <span className="text-sm font-medium">Message</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default MessageNode;
