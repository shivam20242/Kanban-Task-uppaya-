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
      <div>
        <div>Mobile App</div>
        <div>Webite Redesign</div>
        <div>Design System</div>
        <div>Wireframes</div>
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
          We don’t have any notice for you, till then you can share your
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
