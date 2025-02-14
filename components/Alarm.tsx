import React from "react";

interface AlarmProps {
  hasError: boolean;
  message?: string;
}

const Alarm: React.FC<AlarmProps> = ({ hasError, message }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
            flex items-center justify-center
            rounded-full w-16 h-16
            transition-colors duration-300
            ${hasError ? "bg-red-500" : "bg-green-500"}
            shadow-lg
            `}
      >
        <div className="relative">
          {/* Alarm Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
            />
          </svg>
        </div>
      </div>
      <div className="relative  text-lg text-red-500">{hasError ? message || "Error detected" : "No alarms"}</div>
    </div>
  );
};

export default Alarm;
