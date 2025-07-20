"use client";
import FlowBuilder from "@/components/FlowBuilder";
import Navbar from "@/components/ui/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <FlowBuilder />
    </div>
  );
};

export default page;
