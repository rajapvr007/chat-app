import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firbase";
import { AuthContext } from "../pages/context/AuthContext";

const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    handleSearch();
  }, [username, user]);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("Name", "==", username));

    try {
      const querySnapshot = await getDocs(q);

      const uu = querySnapshot.docs.map((doc) => doc.data());
      setUser(uu[0]);
    } catch (error) {
      setError(true);
    }
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
    } catch (error) {
      console.error("Error creating chat document: ", error);
    }

    try {
      // create a user chat
      await updateDoc(doc(db, "userchats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          Name: user.Name,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      // create a user chat for another user
      await updateDoc(doc(db, "userchats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          Name: currentUser.Name,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      // setError(true);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <>
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Find your friends..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {error && (
          <span className="text-red-500 text-[12px] p-3 ">User not found</span>
        )}
        {user && (
          <div
            className="userChat flex gap-4 p-3 hover:bg-red-300"
            onClick={handleSelect}
          >
            <img
              src={user.photoURL}
              alt=""
              className="avatar w-[38px] h-[38px]"
            />
            <div className="userChatInfo pt-2">
              <span className="font-semibold ">{user.Name}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Searchbar;
