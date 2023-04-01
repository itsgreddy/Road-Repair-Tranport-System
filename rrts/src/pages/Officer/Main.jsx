import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/context";
import { db } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
// import { async } from '@firebase/util';

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [inventory, setInventory] = useState({});
  const [workers, setWorkers] = useState(0);
  const [materials, setMaterials] = useState(0);

  const docRef = doc(db, "inventory", "ONE");

  const getInventory = async () => {
    try {
      const docSnap = await getDoc(docRef);
      const filteredDoc = docSnap.data();
      setInventory(filteredDoc);
    } catch (error) {
      console.error(error);
    }
  };
  const update = async () => {
    try {
      await updateDoc(docRef, {
        workers: workers,
        materials: materials,
      });
      getInventory();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="p-4 h-screen space-y-3 bg-teal-500">
      <div className="flex p-4 rounded justify-between  text-white">
        <div className=" font-bold text-2xl">
          <p>Welcome, {user?.displayName}</p>
        </div>
        <button onClick={handleSignOut} className="p-2 bg-gray-800 border border-gray-800">
          Logout
        </button>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="flex px-6 space-x-28">
          <div>
            <span className="font-bold">Available Workers: </span>
            <span>{inventory.workers}</span>
          </div>
          <div>
            <span className="font-bold">Available Materials: </span>
            <span>{inventory.materials}</span>
          </div>
        </div>
        <div className="p-6 space-x-6 space-y-3">
          <input
            type="number"
            placeholder="workers"
            className="border-2 border-solid p-2"
            onChange={(e) => setWorkers(e.target.value)}
          />
          <input
            type="number"
            placeholder="materials"
            className="border-2 border-solid p-2"
            onChange={(e) => setMaterials(e.target.value)}
          />
          <button className="p-2 bg-gray-800 border border-gray-800" onClick={update}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
