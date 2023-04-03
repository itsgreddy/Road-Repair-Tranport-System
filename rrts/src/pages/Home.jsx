import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";



export default function Home() {
  const complaintsCollection = collection(db, "complaints");
  const [sortedComplaints, setSortedComplaints] = useState([]);

  const docRef = doc(db, "inventory", "ONE");
  let var1, var2;
  const getInventory = async () => {
    try {
      const docSnap = await getDoc(docRef);
      const filteredDoc = docSnap.data();

      var1 = Number(filteredDoc.workers);
      var2 = Number(filteredDoc.materials);

    } catch (error) {
      console.error(error);
    }
  };

  const makeSchedule = (filteredData) => {
    let temp = filteredData.sort((a, b) =>
      a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0
    );
    let newarr1 = [];
    let newarr2 = [];

    let workers = var1;
    let materials = var2;

    console.log(temp);

    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      console.log(element.workers_required,element.material_required)
      if (workers - element.workers_required > 0 && materials - element.material_required > 0) {
        newarr1.push(element);
        workers = workers - element.workers_required;
        materials = materials - element.material_required;
      } else {
        newarr2.push(element);
      }      
    }
    let temp2 = newarr1.concat(newarr2);
    setSortedComplaints(temp2);
  };


  const getComplaintslist = async () => {
    //Read Data ans set movie list
    try {
      const data = await getDocs(complaintsCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      makeSchedule(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const func = async () => {
    await getInventory();
    getComplaintslist();
  };
  useEffect(() => {
    func();
  }, []);

  return (
    <>

      <div className="bg-gray-300 h-auto p-6 space-y-3">
        <h1 className="flex justify-center h-20 items-center font-bold text-3xl">
          Road Repair Status
        </h1>
        {sortedComplaints.map((complain) => (
          <div
            className={
              complain.completeStatus
                ? "bg-green-900 p-3 text-white rounded"
                : "bg-red-900 p-3 text-white rounded "
            }
          >
            <h1 className="font-bold">Priority : {complain.priority}</h1>
            <span className="font-bold">Location : </span>
            <h1 Style="display:inline">{complain.location}</h1>
            <br />
            <span className="font-bold">ID : </span>
            <h1 Style="display:inline"> {complain.id}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
