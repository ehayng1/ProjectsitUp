import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
import {
  getFirestore,
  doc,
  getDoc,
  serverTimestamp,
  getDocs,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  updateDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyC5zzgEpNakWPXNGb0BHMUtrVEMsSUxzeY",
  authDomain: "myposture-5466a.firebaseapp.com",
  projectId: "myposture-5466a",
  storageBucket: "myposture-5466a.appspot.com",
  messagingSenderId: "145725455668",
  appId: "1:145725455668:web:e9e2f4832d62ec73adf961",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
let uid;

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    upload();
    getUserInfo();
    // Call any functions or perform actions that require the uid here
  } else {
    // User is signed out, handle accordingly
  }
});

export async function upload(data) {
  // alert(uid);

  const docRef = doc(db, uid, currDate);
  let docSnap = await getDoc(docRef);
  // console.log(data);
  if (docSnap.exists()) {
    let tempData = { ...docSnap.data() };
    for (let key in tempData) {
      if (key !== "timeStamp") {
        tempData[key] = tempData[key] + Math.abs(data[key]);
      }
    }
    console.log("data being set!", data);
    await setDoc(doc(db, uid, new Date().toDateString()), tempData);
  } else {
    await setDoc(doc(db, uid, new Date().toDateString()), data);
  }
}
// resets data
export async function reset(data) {
  // data.useTime = 0;
  // data.cameraTime = 0;
  // data.goodPosture = 0;
  // data.badPosture = 0;
  // data.breakTime = 0;
  // data.countDistance = 0;
  // data.countHeadTowardShoulder = 0;
  // data.countHeadTurned = 0;
  // data.countHeadUporDown = 0;
  let newData = {
    useTime: 0,
    cameraTime: 0,
    goodPosture: 0,
    badPosture: 0,
    breakTime: 0,
    countDistance: 0,
    countHeadTowardShoulder: 0,
    countHeadTurned: 0,
    countHeadUporDown: 0,
  };
  return newData;
}

// load data here
let currDate = new Date().toDateString();

export async function getUserInfo() {
  const docRef = doc(db, uid, currDate);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    document.getElementById("useTime").innerText =
      (docSnap.data().cameraTime / 60000).toFixed(2) + " min";
    document.getElementById("break").innerText =
      (docSnap.data().breakTime / 60000).toFixed(2) + " min";
    document.getElementById("bad").innerText =
      (docSnap.data().badPosture / 60000).toFixed(2) + " min";
    document.getElementById("good").innerText =
      (docSnap.data().goodPosture / 60000).toFixed(2) + " min";
  }
}
getUserInfo();
