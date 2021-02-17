import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmlmIKhHeTBKnlzGpL3hjwNN7VsNnRA2M",
  authDomain: "pokemon-game-c0287.firebaseapp.com",
  projectId: "pokemon-game-c0287",
  storageBucket: "pokemon-game-c0287.appspot.com",
  messagingSenderId: "102519887089",
  appId: "1:102519887089:web:473e9d4d7d236d08048550",
  measurementId: "G-RYGRP4Q787",
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;

export const database = fire.database();

export default database;
