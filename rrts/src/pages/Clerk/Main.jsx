import React, { useState } from "react";
import { UserAuth } from "../../context/context";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const com_coll_ref = collection(db, "complaints");

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  // const [matenum,setMatenum] = useState(0);
  // const [prioritynum,setPrioritynum] = useState(0);
  // const [workernum,setWorkernum] = useState(0);

  const submitToDb = async () => {
    try {
      await addDoc(com_coll_ref, {
        location: location,
        description: description,
        priority: 0,
        material_required: 0,
        workers_required: 0,
      });
      setLocation("");
      setDescription("");
      document.getElementById("text-box").value = "";
      document.getElementById("loc-box").value = "";
      alert("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 h-screen bg-teal-500">
      <div className="flex p-2 rounded justify-between text-white">
        <div className="text-2xl font-bold">
          <p>Welcome, {user?.displayName}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="p-2 bg-gray-800 border border-gray-800"
        >
          Logout
        </button>
      </div>
      <div className="p-7 flex flex-col items-start">
        <div className="flex flex-col justify-around space-y-5 p-6">
          <input
            className="border-2 border-solid p-2 rounded-lg"
            type="text"
            id="loc-box"
            placeholder="location.."
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            rows="15"
            cols="80"
            id="text-box"
            placeholder="Enter your complait debscription...."
            className="p-2 border-2 border-solid rounded-lg"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          className="p-2 bg-gray-800 flex justify-center items-center border border-gray-800"
          onClick={submitToDb}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Account;
