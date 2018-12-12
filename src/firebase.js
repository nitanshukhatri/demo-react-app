import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore'

export const config = {
  apiKey: "AIzaSyAOioIVsHCyy-3p6sG_4GLBlYfKs5VLDfg",
  authDomain: "react-demo-213011.firebaseapp.com",
  databaseURL: "https://react-demo-213011.firebaseio.com",
  projectId: "react-demo-213011",
  storageBucket: "react-demo-213011.appspot.com",
  messagingSenderId: "171776023165"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;

export const database = firebase.database();
