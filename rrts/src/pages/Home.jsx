import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";

// const Home = () => {
//   return (

//   )
// }

// export default Home

export default function Home() {
  const complaintsCollection = collection(db, "complaints");
  const [sortedComplaints, setSortedComplaints] = useState([]);
  // const [labourData,setLabourData] = useState({});
  const docRef = doc(db, "inventory", "ONE");
  let var1, var2;
  const getInventory = async () => {
    try {
      const docSnap = await getDoc(docRef);
      const filteredDoc = docSnap.data();
      // setLabourData(filteredDoc);
      var1 = Number(filteredDoc.workers);
      var2 = Number(filteredDoc.materials);
      // console.log(var1,var2)
      // console.log(`filtered Doc ${typeof (filteredDoc)}`,filteredDoc);
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
    // let workers=Number(labourData.workers)
    // let materials=Number(labourData.materials)
    let workers = var1;
    let materials = var2;
    // console.log("this is makeschedule function")
    // console.log(workers,materials);
    //   temp.forEach(i => {
    //     if ((workers-i.workers)>0 && ( materials-i.materials>0)) {
    //        newarr1.push(i);
    //        workers=workers-i.workers;
    //        materials=materials-i.materials;
    //     }else{
    //        newarr2.push(i);
    //     }
    //  });
    console.log(temp);

    temp.forEach((i) => {
      console.log(typeof i.workers, i.workers);
      if (workers - i.workers > 0 && materials - i.materials > 0) {
        newarr1.push(i);
        workers = workers - i.workers;
        materials = materials - i.materials;
      } else {
        newarr2.push(i);
      }
    });
    //  console.log(newarr1);
    //  console.log(newarr2);
    let temp2 = newarr1.concat(newarr2);
    //  console.log(temp2);
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
      // console.log(filteredData);
      // setcomplaintsList(filteredData);
      // let temp = filteredData.sort((a,b)=>(a.priority>b.priority)? 1 :(a.priority<b.priority)? -1 :0);
      // setSortedComplaints(temp);
      makeSchedule(filteredData);
      // console.log("This is getcomplain function ")
      // console.log(temp);
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
      {/* <div>
        <Link to="/clerk">
          <button>Clerk</button>
        </Link>
        <Link to="/officer">
          <button>Community Officer</button>
        </Link> 
        <Link to="/supervisor">
          <button>Supervisor</button>
        </Link>
      </div> */}

      <div className="p-6 space-y-3">
        {sortedComplaints.map((complain) => (
          <div
            className={
              complain.completeStatus
                ? "bg-green-900 p-3 text-white rounded"
                : "bg-red-900 p-3 text-white rounded "
            }
          >
            <h1>{complain.priority}</h1>
            <span className="font-bold">Location: </span>
            <h1 Style="display:inline">{complain.location}</h1>
            <br />
            <span className="font-bold">id: </span>
            <h1 Style="display:inline"> {complain.id}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
