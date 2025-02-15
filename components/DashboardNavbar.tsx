"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@heroui/button";

//this prop is used for forcing the navbar to use white text for the main page and remove the toggle
interface DashBoardNavbarProps {}

const DashBoardNavbar: React.FC<DashBoardNavbarProps> = ({}) => {
  return (
    <div className=" absolute bottom-0 z-10 bg-gray-100 py-4 border-b border-gray-300  bg-opacity-[100%]  shadow-lg w-full h-[60px] p-6 mt-5 mx-4 flex items-center justify-between px-6">
      {/* Navigation Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 items-center">
          <Button
            onPress={() => (window.location.href = "/billing")}
            variant="light"
            className={`text-xl text-cyan-700`}
          >
            Billing
          </Button>
          <Button
            onPress={() => (window.location.href = "/rainwater")}
            variant="light"
            className={`text-xl text-cyan-700`}
          >
            Rain Water
          </Button>
          <Button
            onPress={() => (window.location.href = "/dashboard")}
            variant="light"
            className={`text-xl text-cyan-700`}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
