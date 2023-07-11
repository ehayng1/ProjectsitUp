import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyC5zzgEpNakWPXNGb0BHMUtrVEMsSUxzeY",
  authDomain: "myposture-5466a.firebaseapp.com",
  projectId: "myposture-5466a",
  storageBucket: "myposture-5466a.appspot.com",
  messagingSenderId: "145725455668",
  appId: "1:145725455668:web:e9e2f4832d62ec73adf961",
};
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
const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function signIn(event) {
  event.preventDefault(); // Prevent the form submission and page reload
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();
  let uid;
  // alert(uid);
  // await setDoc(doc(db, uid, new Date().toDateString()), {
  //   badPosture: 0,
  // });
  // await setDoc(doc(db, "cities", "LA"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA",
  // });

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      uid = user.uid;
      console.log(user);
      return uid;
      // ...
    })
    // .then((uid) => {
    //   setDoc(doc(db, uid, new Date().toDateString()), {
    //     badPosture: 0,
    //   });
    //   alert("Signed Up!");
    // })
    // .then(() => (window.location.pathname = "./index.html"))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  mainWindow.loadFile("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("register").addEventListener("click", signIn);
});
