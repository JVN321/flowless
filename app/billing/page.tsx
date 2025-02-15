"use client";

import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import BillingGraph from "@/components/BillingGraph";
import { IndianRupee } from "lucide-react";

export default function Billing() {
  const [currentCost, setCurrentCost] = useState<number>(0);
  const [projectedCost, setProjectedCost] = useState<number>(0);

  useEffect(() => {
    const fetchCurrentCost = async () => {
      try {
        const response = await fetch('/api/getSensorDataDaily');
        const result = await response.json();
        
        if (result.success && result.data && result.data.length > 0) {
          const WATER_RATE = 0.02;
          const todayConsumption = result.data[0].consumption;
          setCurrentCost(todayConsumption * WATER_RATE);
          
          // Calculate projected cost
          const avgConsumption = result.data
            .slice(0, 3)
            .reduce((acc: number, curr: any) => acc + curr.consumption, 0) / 3;
          setProjectedCost(avgConsumption * WATER_RATE);
        }
      } catch (error) {
        console.error("Error fetching current cost:", error);
      }
    };

    fetchCurrentCost();
    const interval = setInterval(fetchCurrentCost, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="flex flex-col gap-6 p-4">
        {/* Cost Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Today's Cost</h3>
            <div className="flex items-center text-2xl font-bold text-blue-600">
              <IndianRupee className="w-6 h-6 mr-2" />
              {currentCost.toFixed(2)}
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Projected Daily Cost</h3>
            <div className="flex items-center text-2xl font-bold text-green-600">
              <IndianRupee className="w-6 h-6 mr-2" />
              {projectedCost.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Billing Graph */}
        <BillingGraph />
      </div>

      <div className="flex fixed bottom-0 left-0 right-0 p-10 items-center justify-center">
        <DashboardNavbar />
      </div>
    </div>
  );
}