import React from "react";
import { LuSendHorizonal } from "react-icons/lu";

const Input = () => {
  return (
    <div className="input bg-gray-400/50">
      <input
        type="text"
        placeholder="Type a message..."
        className="w-[90%] py-4 px-1 bg-gray-300/50 border-none focus:outline-none text-[18px] text-gray-700"
      />
      <div className="send flex gap-2 p-2">
        <img src="./attachment-clip.png" alt="" className="w-[20px] h-[20px] cursor-pointer" />
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src="./gallery.png" alt="" className="w-[20px] h-[20px] cursor-pointer" />
        </label>
        <button className="">
          <LuSendHorizonal className="w-[20px] h-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default Input;
