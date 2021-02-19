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

class FirebaseService {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonsSocket = (cb) => {
    this.database.ref("pokemons").on("value", (snapshot) => cb(snapshot.val()));
  };

  offPokemonsSocket = () => {
    this.database.ref("pokemons").off();
  };

  getPokemonsOnceAsync = async () => {
    return await this.database
      .ref("pokemons")
      .once("value")
      .then((snapshot) => snapshot.val());
  };

  updatePokemon = (key, poke) => {
    this.database.ref(`pokemons/${key}`).set(poke);
  };

  addPokemon = (poke, cb) => {
    const newPostKey = this.database.ref().child("pokemons").push().key;
    this.database
      .ref(`pokemons/${newPostKey}`)
      .set(poke)
      .then(() => {
        cb && cb();
      });
  };
}

export default FirebaseService;
