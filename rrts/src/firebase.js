import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2DCklwiliNeSGkSI0duMNpYP8tOJisi8",
    authDomain: "road-repair-tracking-system.firebaseapp.com",
    projectId: "road-repair-tracking-system",
    storageBucket: "road-repair-tracking-system.appspot.com",
    messagingSenderId: "583240128986",
    appId: "1:583240128986:web:83691b47c44a6d3d8148e3"
};

// const secondaryAppConfig = {
//     projectId: "supervisor-83892",
//     appId: "1:686005554701:web:3e6685c881802d2ba54f44",
//     apiKey: "AIzaSyAYwMmcgHdKoQhbRqvKJPBbXUEZBjGHyzk",
//     storageBucket: "supervisor-83892.appspot.com",
//     // databaseURL: "...",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const secondaryApp = initializeApp(secondaryAppConfig, "secondary");

// export const auth = getAuth(app, secondaryApp);
export const auth = getAuth(app);

export const db = getFirestore(app)