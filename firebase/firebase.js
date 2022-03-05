import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyA6LaKoJkMpAFpnl4pjI2kFz8h1Y2PP86U",
  authDomain: "reactnativechatapp-76e7e.firebaseapp.com",
  projectId: "reactnativechatapp-76e7e",
  storageBucket: "reactnativechatapp-76e7e.appspot.com",
  messagingSenderId: "18261540558",
  appId: "1:18261540558:web:2ba8caa630cf37cca69a9f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }
// // const db = app.firestore();
// const auth = firebase.auth();

// export { auth };
// export default firebase;
