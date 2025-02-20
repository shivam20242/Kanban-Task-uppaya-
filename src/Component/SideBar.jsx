import React, { useState } from "react";
import "../styling/sidebar.css";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  MessageSquareMore,
  CalendarCheck2,
  Users,
  Settings,
  CirclePlus,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
const SideBar = () => {
  const [isOpen, setisOpen] = useState(true)
  return (
    <>
    <div className="sidebar">
      <div className="log">
        <img src={logo} alt="" />
        <span>Project M.</span>
        {isOpen ? <ArrowLeft className="ml-10" /> : <ArrowRight className="ml-10" />}
      </div>
      <div>
        <div>
          <LayoutGrid /> Home
        </div>
        <div>
          <MessageSquareMore /> Message
        </div>
        <div>
          {" "}
          <CalendarCheck2 /> Task
        </div>
        <div>
          <Users /> Members
        </div>
        <div>
          <Settings /> Settings
        </div>
      </div>
      <div>
        My Project <CirclePlus />
      </div>
      <div className="flex flex-col space-y-2 px-4 py-2">
        <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Mobile App
          </div>
          <span className="text-gray-400">...</span>
        </button>
        
        <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            Website Redesign
          </div>
          <span className="text-gray-400">...</span>
        </button>
        
        <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Design System
          </div>
          <span className="text-gray-400">...</span>
        </button>
      </div>
      <div className="w-70 h-60 my-10 bg-gray-100 rounded-lg p-4 text-center shadow-md">
        <div className="flex justify-center">
          <div className="bg-yellow-400 rounded-full p-2">
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10A10 10 0 0 1 12 2zm0 14v2m0-8h.01"
              />
            </svg>
          </div>
        </div>
        <h2 class="text-lg font-semibold mt-2">Thoughts Time</h2>
        <p className="text-gray-500 text-sm mt-1">
          We don't have any notice for you, till then you can share your
          thoughts with your peers.
        </p>
        <button className="mt-4 bg-white border border-gray-300 text-black py-2 px-4 rounded-lg shadow-sm hover:bg-gray-200">
          Write a message
        </button>
      </div>
    </div>
    </>
  );
};

export default SideBar;
