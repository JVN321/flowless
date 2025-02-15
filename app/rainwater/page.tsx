"use client";

import React from "react";
import WeatherInfo from "@/components/WeatherInfo";
import ConsumptionGraphRainwaterRealtime from "@/components/ConsumptionGraphRainwaterRealtime";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function Rainwater() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="flex flex-col lg:flex-row gap-4 p-4 items-center justify-center">
        <div className="w-full lg:w-[30rem]">
          <WeatherInfo />
        </div>
        <div className="w-full lg:w-[30rem]">
          <ConsumptionGraphRainwaterRealtime />
        </div>
      </div>

      <div className="flex fixed bottom-0 left-0 right-0 p-10 items-center justify-center">
        <DashboardNavbar />
      </div>
    </div>
  );
}