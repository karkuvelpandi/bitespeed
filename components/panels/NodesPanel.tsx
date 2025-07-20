'use client';
import React from 'react';
import { BiMessageRoundedDetail } from "react-icons/bi";

const NodesPanel = () => {

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 space-y-4">
      <div
        className="px-4 py-3 border-2 border-blue-200 rounded-md bg-white shadow-sm cursor-move hover:bg-blue-50 transition-colors"
        draggable
        onDragStart={(event) => onDragStart(event, 'text')}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#00d1ee] rounded-full"></div>
          <span className="text-sm font-medium">Text Node</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Drag to add a text node</p>
      </div>

      <div
        className="px-4 py-3 border-2 border-blue-200 rounded-md bg-white shadow-sm cursor-move hover:bg-blue-50 transition-colors w-1/2"
        draggable
        onDragStart={(event) => onDragStart(event, 'message')}
      >
        <div className="flex items-center justify-center space-x-2 flex-col">
          <BiMessageRoundedDetail className="!mr-0 w-5 h-5" />
          <span className="text-sm font-medium">Message</span>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;