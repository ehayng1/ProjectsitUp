import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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
  const name = document.getElementById("name").value;

  // data we want to write to firebase
  const sex = document.getElementById("sex").value;
  const weight = document.getElementById("weight").value;
  const game = document.getElementById("gaming").value;
  const medCondition = document.getElementById("medCondition").value;
  const sports = document.getElementById("sprots").value;
  // const gaming = ["Computer", "Console", "Phone"]

  await setDoc(doc(db, "users", email), {
    email: email,
    name: name,
    sex: sex,
    weight: weight,
    game: game,
    medCondition: medCondition,
    sports: sports,
  });

  const auth = getAuth();
  let uid;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      uid = user.uid;
      console.log(user);
      // ...
    })
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          const auth = getAuth();
          console.log("name updated:", auth.currentUser.displayName);
          alert("Thank you for signing up!");
          window.electronAPI.send("navigateToPage", "index.html");
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // if (errorMessage === "auth/user-not-found" || "auth/wrong-password") {
      //   alert("Email or password do not match");
      // }
      console.log(error);

      if (errorCode == "auth/email-already-in-use") {
        alert(
          "This email is already being used. Please use a different email account"
        );
      } else if (name === "") {
        alert("Please enter your name.");
      } else if (email === "") {
        alert("Please enter email address.");
      } else if (password === "") {
        alert("Please enter password.");
      } else if (errorCode == "auth/weak-password") {
        alert("Password is too weak.");
      } else if (errorCode == "auth/network-request-failed") {
        alert("Network connection failed.");
      } else if (errorCode == "auth/invalid-email") {
        alert("Email format is invalid");
      } else {
        alert(errorMessage);
      }
      // ..
    });
  // mainWindow.loadFile("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("register").addEventListener("click", signIn);
});
