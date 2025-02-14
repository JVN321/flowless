"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Button} from "@heroui/button";

//this prop is used for forcing the navbar to use white text for the main page and remove the toggle
interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({ }) => {
  return (
    <div className="relative z-10 bg-white bg-opacity-[7%] shadow max-w-[90%] w-full h-[60px] mt-5 mx-4 rounded-3xl flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image src="/vercel.svg" alt="Flowless Logo" width={40} height={40} className="mr-4 rounded-xl cursor-pointer" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 items-center">
          
          <Button onPress={() => window.location.href = '/login'} variant='light' className={`text-xl text-white`}>
            Login
          </Button>
          <Button
            onPress={() => window.location.href = '/dashboard'}
            variant='light'
            className={`text-xl text-white cursor-pointer`}
          >
            Dashboard
          </Button>
        </div>
      </div>      
    </div>
  );
};

export default Navbar;