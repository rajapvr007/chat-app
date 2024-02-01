import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../pages/context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firbase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
        if (doc) {
          setChats(doc.data());
        }
        return () => {
          unsub();
        };
      });
    }
  }, [currentUser]);
  return (
    <>
      <div className="overflow-auto h-screen   ">
        {Object.entries(chats)?.map((chat) => (
          <div className="useChat " key={chat[0]}>
            <img src={chat[1].userInfo.photoURL} alt="" className="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.Name}</span>
              <p>{chat[1].userInfo.lastMessage?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chats;
