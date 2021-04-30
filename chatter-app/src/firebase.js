import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAN4I8YwQukZzEztsihcN2Mzh4cgKvORu4",
  authDomain: "mudassir-chatter.firebaseapp.com",
  projectId: "mudassir-chatter",
  storageBucket: "mudassir-chatter.appspot.com",
  messagingSenderId: "15880503365",
  appId: "1:15880503365:web:10675fcc9b6bb6a9c2232c",
};

// Initialize Firebase

//initializing the app
const firebaseApp = firebase.initializeApp(firebaseConfig);
//accessing firestore
const db = firebaseApp.firestore();
//Auth handler
const auth = firebase.auth();
//google Auth
const provider = new firebase.auth.GoogleAuthProvider();

//exporting explicitly
export { auth, provider };
export default db;
