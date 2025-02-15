"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, XAxis, YAxis, Rectangle,CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Bar
} from "recharts";



// Define sensor data structure
interface SensorData {
  timestamp: string;
  sensor1: number;
  sensor2: number;
}

export default function ConsumptionGraphDaily() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getSensorDataDaily');
        const data = await response.json();
        //console.log(data);
        setSensorData(data["data"]);
      } catch (error) {
        //console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Reduced to 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tank 1 Daily Consumption</h2>
      <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={sensorData}
          margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" name="Date" />
          <YAxis name="Consumption" />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumption" fill="#8884d8" name="Consumption" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
