"use client";

import { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

interface BillingData {
  id: number;
  consumption: number;
  date: string;
  cost: number;
}

const WATER_RATE = 0.00000441; // Cost per liter in your currency

export default function BillingGraph() {
  const [billingData, setBillingData] = useState<BillingData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getSensorDataDaily');
        const result = await response.json();
        
        if (result.success && result.data) {
          // Calculate costs for existing data
          const processedData = result.data.map((item: any) => ({
            ...item,
            date: new Date(item.date).toLocaleDateString(),
            cost: (item.consumption * WATER_RATE).toFixed(2)
          }));

          // Add projections for next two days
          const lastTwoValues = processedData.slice(0, 2);
          const avgConsumption = lastTwoValues.reduce((acc, curr) => 
            acc + curr.consumption, 0) / lastTwoValues.length;
          
          const lastDate = new Date(result.data[0].date);
          
          // Add projection days
          for (let i = 1; i <= 2; i++) {
            const projectedDate = new Date(lastDate);
            projectedDate.setDate(lastDate.getDate() + i);
            
            processedData.unshift({
              id: -i,
              date: projectedDate.toLocaleDateString(),
              consumption: avgConsumption,
              cost: (avgConsumption * WATER_RATE).toFixed(2)
            });
          }

          setBillingData(processedData.reverse());
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Water Usage Cost</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={billingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cost"
            name="Cost"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}