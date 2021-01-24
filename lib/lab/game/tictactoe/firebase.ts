import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDu-Xa-cHR-0NfbcuvKboUb0iF6kSkw3Zg",
  authDomain: "tictactoe-23b9c.firebaseapp.com",
  projectId: "tictactoe-23b9c",
  storageBucket: "tictactoe-23b9c.appspot.com",
  messagingSenderId: "299159818951",
  appId: "1:299159818951:web:09dcd2b021c03a8c66a4e2",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export const database = firebase.database();
