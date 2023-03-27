import React, { useEffect, useState } from "react";
import { UserAuth } from '../../context/context';
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Account = () => {

  const {logOut, user} = UserAuth();

  const handleSignOut = async() => {
    try{
        await logOut()
    } catch (error) {
        console.log(error)
    }
  }

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
      setPrioritynum(0);setMatenum(0);setWorkernum(0);setIsComplete(false);
      getComplaintsList();
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getComplaintsList();
  },[]);

  return (
    <div className=''>
      <h1 className=''>Account</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} className=''>
        Logout
      </button>

      <div>
      {complaintsList.map((complain) => (
        <div className="p-6 ">
          <div>
            <h1 className="font-bold" >Location: </h1>
            <h1> {complain.location}</h1>
            <br />
            <h1 className="font-bold" >Description: </h1>
            <p className="py-4"> {complain.description}</p>
            <div className="flex justify-start space-x-12">
              <div >
                <span className="font-bold" >Material Required: </span>
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
            </div>
          </div>
          <div className="space-x-2 space-y-2">
            <input
              className="border-2 border-solid p-2"
              type="number"
              id="matin-id"
              placeholder="materials_number.."
              onChange={(e) => setMatenum(e.target.value)}
            />
            <input
              className="border-2 border-solid p-2"
              type="number"
              id="priin-id"
              placeholder="priority.."
              onChange={(e) => setPrioritynum(e.target.value)}
            />
            <input
              className="border-2 border-solid p-2 rounded"
              type="number"
              id="worin-id"
              placeholder="workers_number.."
              onChange={(e) => setWorkernum(e.target.value)}
            />
            <input
              className="border-2 border-solid p-2 rounded"
              type="checkbox"
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            <label className="border-2 border-solid p-2 rounded">Is Complete</label>
            <button className="p-2 " onClick={() => updatedata(complain.id)}>Update</button>
            <br />
            <button className="p-2 " onClick={() => deletedata(complain.id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Account;