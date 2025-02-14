"use client";
import React, { useEffect, useState } from "react";

interface TankLevelProps {
  level: number; // Level percentage (0-100)
  height?: number; // Tank height in pixels
  width?: number; // Tank width in pixels
  color?: string; // Water color
}

const TankLevel: React.FC<TankLevelProps> = ({ level, height = 200, width = 100, color = "#2196f3" }) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    // Animate the water level
    setCurrentLevel(level);
  }, [level]);

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
            transition: "height 1s ease-in-out",
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
