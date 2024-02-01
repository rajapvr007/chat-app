import React from "react";

const Message = () => {
  return (
    <>
      <div className="message owner">
        <div className="messageInfo">
          <img src="./R.jpg" alt="" className="w-[50px] rounded-full" />
          <span className="text-gray-500 text-[10px]">Just now..</span>
        </div>
        <div className="messageContent">
          <img src="./R.jpg" alt="" />
          <p>Hello </p>
        </div>
      </div>
    </>
  );
};

export default Message;
