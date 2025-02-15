"use client";
import React, { useEffect, useState } from "react";

interface TankLevelProps {
  height?: number;
  width?: number;
  color?: string;
}

interface SensorData {
  sensor1: number;
}

const MLITTER_PER_CM = 200;

const TankLevel: React.FC<TankLevelProps> = ({ height = 200, width = 100, color = "#2196f3" }) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch('/api/getSensorData');
        const result = await response.json();
        
        
        if (result.success && result.data ) {
          // Convert sensor value to percentage (assuming MAX_VALUE is your maximum sensor reading)
          const MAX_VALUE = 2000;
          const MIN_VALUE = 24;

          const formattedData = result.data.map((item: SensorData) => ({
            ...item,
            sensor1: MAX_VALUE - Math.max(0,((Math.round(item.sensor1 * 100) / 100) - 13) * MLITTER_PER_CM),
            
          }));
          const sensorValue = formattedData[0]["sensor1"];

          
          
          // Inverse the percentage calculation since ultrasonic readings are inverse
          const percentage =  Math.max(0, (sensorValue / MAX_VALUE * 100));
          setCurrentLevel(percentage);
        }
      } catch (error) {
        console.error('Failed to fetch tank level:', error);
      }
    };

    fetchLevel();
    const interval = setInterval(fetchLevel, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex p-4 rounded-3xl shadow-lg">
      <div
        className="bg-zinc-950"
        style={{
          position: "relative",
          height: height,
          width: width,
          border: "4px solid #666",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Water level */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: `${currentLevel}%`,
            backgroundColor: color,
            transition: "height 0.5s ease-in-out",
          }}
        >
          {/* Water surface effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "10px",
              background: `linear-gradient(180deg, ${color}88 0%, ${color} 100%)`,
            }}
          />
        </div>

        {/* Level percentage text */}
        <div
          className="text-white"
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.5rem",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          {Math.round(currentLevel)}%
        </div>
      </div>
    </div>
  );
};

export default TankLevel;