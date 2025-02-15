"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MAX_SCALE = parseInt(process.env.MAX_LEVEL || "3000");
const MIN_VALUE = 24;
const MAX_VALUE = 2000;
const MLITTER_PER_CM = 200;

interface SensorData {
  timestamp: string;
  sensor1: number;
  sensor2: number;
}

export default function ConsumptionGraphRainwaterRealtime() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  var currentValue = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getSensorData");
        const result = await response.json();

        if (result.success && result.data) {
          
          const formattedData = result.data.map((item: SensorData) => ({
            ...item,
            sensor1: MAX_VALUE - Math.max(0,((Math.round(item.sensor1 * 100) / 100) - 13) * MLITTER_PER_CM),
            timestamp: new Date(item.timestamp).toLocaleTimeString(),
          }));
          currentValue = formattedData[0]["sensor1"];
          setSensorData((prevData) => {
            const newData = [...prevData, ...formattedData];
            return newData.slice(-50);
          });
        }
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
      <h2 className="text-xl font-semibold mb-4">Rain water Tank</h2>
      <ResponsiveContainer width="90%" height={400}>
        <AreaChart
          data={sensorData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={[0, (dataMax) => MAX_SCALE]} allowDataOverflow={true} /> {/* Set fixed Y-axis range */}
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="sensor1"
            name="Rainwater Tank"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.4}
            isAnimationActive={false}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
