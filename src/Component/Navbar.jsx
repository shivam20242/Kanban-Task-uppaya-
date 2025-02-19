import React from "react";
import "../styling/navbar.css";
import { Search, Calendar, MessageSquareDot, Bell } from "lucide-react";
import profile from '../assets/MaskGroup.png'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="search">
        <Search size={20} color="#666666" />
        <input type="text" placeholder="Search for anything..." />
      </div>
      <div className="icons">
        <Calendar />
        <MessageSquareDot />
        <Bell />
      </div>
      <div className="pic">
        <p>Palak Jain <span className="spa">Rajasthan, India</span> </p>
        <img src={profile} alt=""/>
      </div>
    </div>
  );
};

export default Navbar;
