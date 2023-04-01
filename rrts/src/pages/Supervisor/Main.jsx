import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/context";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [complaintsList, setcomplaintsList] = useState([]);
  const [matenum, setMatenum] = useState(0);
  const [prioritynum, setPrioritynum] = useState(0);
  const [workernum, setWorkernum] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const complaintsCollection = collection(db, "complaints");

  const getComplaintsList = async () => {
    //Read Data ans set movie list
    try {
      const data = await getDocs(complaintsCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setcomplaintsList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const deletedata = async (id) => {
    const complaintDoc = doc(db, "complaints", id);
    await deleteDoc(complaintDoc);
    getComplaintsList();
  };

  const updatedata = async (id) => {
    const complaintDoc = doc(db, "complaints", id);
    try {
      await updateDoc(complaintDoc, {
        priority: prioritynum,
        material_required: matenum,
        workers_required: workernum,
        completeStatus: isComplete,
      });
      setPrioritynum(0);
      setMatenum(0);
      setWorkernum(0);
      setIsComplete(false);
      getComplaintsList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComplaintsList();
  }, []);

  return (
    <div className=" bg-teal-500">
      <div className="p-4 space-y-3">
        <div className="flex p-4 rounded justify-between text-white">
          <div className="text-2xl font-bold ">
            <p>Welcome, {user?.displayName}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 bg-gray-800 border border-gray-800"
          >
            Logout
          </button>
        </div>

        <div className="">
          {complaintsList.map((complain) => (
            <div className="p-6 bg-teal-900 my-3 text-white rounded">
              <div>
                <h1 className="font-bold">Location: </h1>
                <h1> {complain.location}</h1>
                <br />
                <h1 className="font-bold">Description: </h1>
                <p className="py-4"> {complain.description}</p>
                <div className="flex justify-start space-x-12">
                  <div>
                    <span className="font-bold">Material Required: </span>
                    <span>{complain.material_required}</span>
                  </div>
                  <div>
                    <span className="font-bold">Priority Number: </span>
                    <span>{complain.priority}</span>
                  </div>
                  <div>
                    <span className="font-bold">Workers Required: </span>
                    <span>{complain.workers_required}</span>
                  </div>
                  <div>
                    <span className="font-bold">Complete Status: </span>
                    <span>{String(complain.completeStatus)}</span>
                  </div>
                </div>
              </div>
              <div className="space-x-2 space-y-2">
                <input
                  className="border-2 border-solid p-2 rounded text-black"
                  type="number"
                  id="matin-id"
                  placeholder="materials_number.."
                  // value={matenum}
                  onChange={(e) => setMatenum(e.target.value)}
                />
                <input
                  className="border-2 border-solid p-2 rounded text-black"
                  type="number"
                  id="priin-id"
                  placeholder="priority.."
                  // value={prioritynum}
                  onChange={(e) => setPrioritynum(e.target.value)}
                />
                <input
                  className="border-2 border-solid p-2 rounded text-black"
                  type="number"
                  id="worin-id"
                  placeholder="workers_number.."
                  // value={workernum}
                  onChange={(e) => setWorkernum(e.target.value)}
                />
                <input
                  className="border-2 border-solid p-2 rounded"
                  type="checkbox"
                  // value={isComplete}
                  onChange={(e) => setIsComplete(e.target.checked)}
                />
                <label className="border-2 border-solid p-2 rounded">
                  Is Complete
                </label>
                <button
                  className="p-2 bg-gray-800 border border-gray-800"
                  onClick={() => updatedata(complain.id)}
                >
                  Update
                </button>
                <br />
                <button
                  className="p-2 bg-gray-800 border border-gray-800"
                  onClick={() => deletedata(complain.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
