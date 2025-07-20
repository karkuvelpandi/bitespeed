"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { statusAtom } from "@/utils/store";

const UserInput = () => {
  const router = useRouter();
  const [status, setStatus] = useAtom(statusAtom);
  const [username, setUsername] = React.useState("");
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00d1ee] focus:border-transparent transition-all duration-200"
      />
      <button
        disabled={!username}
        onClick={() => {
            setUsername("")
            setStatus({ ...status, username: username, flowKeyName: `biteSpeedFlow-${username}` })
            localStorage.setItem("biteSpeedUsername", username)
            router.push("/builder")
            }}
        className="w-full bg-[#00d1ee] text-white font-medium hover:bg-[#00b8d4] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors duration-200 transform hover:scale-105 disabled:transform-none"
      >
        Get Started
      </button>
    </div>
  );
};

export default UserInput;
