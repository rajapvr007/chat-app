import React from "react";
import Navbar from "./Navbar";
import Chats from "./Chats";
import Searchbar from "./Searchbar";

const Sidebar = () => {
  return (
    <div className="sidebar  ">
      <div>
        <Navbar />
        <Searchbar />
        <Chats />
      </div>
    </div>
  );
};

export default Sidebar;
