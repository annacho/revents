import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEnGgJ2Eo4uqzNi1zD6P_R-qbAv6qe1So",
  authDomain: "revents-f6435.firebaseapp.com",
  databaseURL: "https://revents-f6435.firebaseio.com",
  projectId: "revents-f6435",
  storageBucket: "",
  messagingSenderId: "843400480315"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firebase.settings(settings);

export default firebase;
