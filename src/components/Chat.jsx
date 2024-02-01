import React from "react";
import { FaVideo } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
   <>
    <div className="chat">
      <div className="chatHeader  ">
        <div className="chatHeaderInfo ml-3">
          <h3>Raja Nayak</h3>
        </div>
        <div className="chatHeaderRight mr-4">
          <FaVideo className="icons" />
          <MdAccountCircle className="icons" />
          <HiOutlineDotsHorizontal className="icons" />
        </div>
      </div>
      <Messages />
      <Input />

    </div>
   </>
  );
};

export default Chat;
