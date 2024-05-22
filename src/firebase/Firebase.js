// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNEV0zj_GWdS7f7gc9MoMN0G6iiVE0F5w",
  authDomain: "what-b9a09.firebaseapp.com",
  databaseURL: "https://what-b9a09-default-rtdb.firebaseio.com",
  projectId: "what-b9a09",
  storageBucket: "what-b9a09.appspot.com",
  messagingSenderId: "667665172567",
  appId: "1:667665172567:web:dd2ef3f1625a39ac5efb12",
  measurementId: "G-JGE70QGV22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;