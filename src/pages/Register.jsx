import React, { useState, useEffect } from "react";
import { auth, storage, db } from "../firbase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const [fileName, setFileName] = useState("No file choosen");
  useEffect(() => {
    document.getElementById("avatar").addEventListener("change", function () {
      setFileName(
        this.files.length > 0 ? this.files[0].name : "No file choosen"
      );
    });
  }, []);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.avatar.files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storage = getStorage();
      const storageRef = ref(storage, Name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              ``;
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: Name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              Name,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userchats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error(
          "The email address is already in use by another account."
        );
      } else {
        console.error(error.message);
      }
      setError(true);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-300/50">
        <div className="bg-white p-8 rounded-lg shadow-md w-[90%] lg:w-[400px]">
          <h1 className="text-3xl font-semibold mb-6 text-center text-violet-400">
            ChitChat
          </h1>
          <p className="text-center text-xl text-blue-400">Register</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="inputLR"
                placeholder="Name"
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="mb-4">
              <input
                className="inputLR"
                placeholder="Email"
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-4">
              <input
                className="inputLR"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
              />
            </div>

            <div className="mb-4 ">
              <div className="flex ">
                <input
                  className="inputLR hidden"
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                />
                <label htmlFor="avatar" className="block mb-2 cursor-pointer">
                  <img src="./gallery.png" alt="" className="w-8" />
                </label>
                <span className="ml-2 text-[14px] lg:text-base text text-gray-400">
                  Add an avatar
                </span>
              </div>
              <div id="file-name" className="text-gray-500 text-[12px]">
                {fileName}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            {error && (
              <p className="text-red-500 text-center mt-4">
                Something went wrong
              </p>
            )}
          </form>
          <p className="text-center mt-4">
            Do you have an account?
            <Link to="/login" className="text-blue-500">
              Login </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
