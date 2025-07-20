"use client";
import { statusAtom } from "@/utils/store";
import { useAtom } from "jotai";
import React from "react";

const Tabs = () => {
  const [status, setStatus] = useAtom(statusAtom);
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => setStatus({ ...status, activeTab: "nodes" })}
        className={`px-6 py-3 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
          status.activeTab === "nodes"
            ? "text-[#00d1ee] border-[#00d1ee]"
            : "text-gray-500 border-transparent hover:text-[#00d1ee]"
        }`}
      >
        Nodes Panel
      </button>
      <button
        onClick={() => setStatus({ ...status, activeTab: "settings" })}
        className={`px-6 py-3 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
          status.activeTab === "settings"
            ? "text-[#00d1ee] border-[#00d1ee]"
            : "text-gray-500 border-transparent hover:text-[#00d1ee]"
        }`}
      >
        Settings Panel
      </button>
    </div>
  );
};

export default Tabs;
