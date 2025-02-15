"use client";

import React from "react";
import TankLevel from "@/components/TankLevel";
import MotorControls from "@/components/MotorControls";
import ConsumptionGraphDaily from "@/components/ConsumptionGraphDaily";
import ConsumptionGraphRealtime from "@/components/ConsumptionGraphRealtime";
import DashboardNavbar from "@/components/DashboardNavbar";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
    
    <div className="min-h-screen bg-white  w-full">
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 p-4 items-center justify-center">
        {/* Left column - Tanks and Controls */}
        <div className="flex flex-col gap-4 w-full lg:w-auto">
        <h1 className="text-center text-xl">Current Levels</h1>
          <div className="flex flex-row flex-wrap items-center gap-4 justify-center">
            
            <TankLevel  color="#2196f3" />
            <TankLevel  color="#2196f3" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <MotorControls />

          </div>
        </div>

        {/* Middle column - Realtime Graph */}
        <div className="w-full lg:w-[30rem]">
          <ConsumptionGraphRealtime />
        </div>

        {/* Right column - Daily Graph */}
        <div className="w-full lg:w-[30rem]">
          <ConsumptionGraphDaily />
        </div>
      </div>

      <div className="flex fixed bottom-0 left-0 right-0 p-10 items-center justify-center">
        <DashboardNavbar />
      </div>
    </div>
  );
}
