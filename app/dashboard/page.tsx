"use client";

import React from "react";
import TankLevel from "@/components/TankLevel";
import MotorControls from "@/components/MotorControls";
import Alarm from "@/components/Alarm";
import ConsumptionGraphDaily from "@/components/ConsumptionGraphDaily";
import ConsumptionGraphRealtime from "@/components/ConsumptionGraphRealtime";

export default function Dashboard() {
  return (
    <main className=" flex flex-col gap-2 p-4 items-center bg-white h-full">
      <div className="flex flex-row gap-2">
        <div className="flex flex-row items-center gap-2 justify-center rounded-3xl ">
          <TankLevel level={50} color="#2196f3" />
        </div>
        
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col items-center gap-2  justify-center rounded-3xl ">
          <MotorControls></MotorControls>
          
        </div>
        <div className="flex flex-row items-center gap-2 p-2 justify-center rounded-3xl ">
        <Alarm hasError={true} message={"Some Error"}></Alarm>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[30rem]">
        <ConsumptionGraphRealtime></ConsumptionGraphRealtime>
      </div>
      <div className="flex flex-col gap-2 w-[30rem]">
        <ConsumptionGraphDaily></ConsumptionGraphDaily>
      </div>
    </main>
  );
}
