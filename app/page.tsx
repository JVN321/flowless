"use client";

import React from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className="text-center text-5xl sm:text-8xl">FLOWLESS</div>
        <div className="text-center text-xl">control your flow with your phone</div>
      </div>
    </main>
  );
}
