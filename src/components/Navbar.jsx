import { signOut } from "firebase/auth";
import React, {useContext} from "react";
import { auth } from "../firbase";
import { AuthContext } from "../pages/context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="navbar">
        <span className="logo ml-1">ChitChat</span>
        <div className="user flex space-x-2 mr-1">
          <img src={currentUser.photoURL} alt="" className="avatar" />
          <span className="username p-1">{currentUser.displayName}</span>
          <button className="btn-Navbar" onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
