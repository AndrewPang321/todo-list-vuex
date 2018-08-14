import firebase from 'firebase';

const secrets = {
  apiKey: "AIzaSyAAQzO-rKUrzeFVOp41DVEcI7XgW-Hghco",
  authDomain: "todo-list-96fe9.firebaseapp.com",
  databaseURL: "https://todo-list-96fe9.firebaseio.com",
  projectId: "todo-list-96fe9",
  storageBucket: "todo-list-96fe9.appspot.com",
  messagingSenderId: "1091931719286"
};

firebase.initializeApp(secrets);
export const db = firebase.database();
export const auth = firebase.auth();