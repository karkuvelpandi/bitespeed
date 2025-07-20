import React from "react";

const NoFlowPanel = () => {
  return (
    <div className="mx-auto flex items-center justify-center h-auto gap-4 text-center p-8">
      <div className="flex flex-col items-center justify-center h-auto w-full gap-4 text-center p-8 bg-white rounded-lg shadow-md border border-gray-100">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-gray-400 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#00d1ee"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">No Flow Selected</h3>
        <p className="text-gray-500 max-w-md">
          Create a new flow from the dropdown menu or select an existing one to
          get started.
        </p>
      </div>
    </div>
  );
};

export default NoFlowPanel;
