import { useState, useEffect } from "react";
import database from "../../../services/firebase";

import LayoutBg from "../../../assets/bg1.jpg";

import s from "./Start.module.css";

import PokemonCard from "./../../../components/PokemonCard";
import Layout from "./../../../components/Layout";

const GamePage = () => {
  const [pokemons, SetPokemons] = useState({});

  const onCard = (pokemonId) => {
    Object.entries(pokemons).reduce((acc, item) => {
      const pokemon = { ...item[1] };
      if (pokemon.id === pokemonId) {
        pokemon.isActive = !pokemon.isActive;
        database
          .ref("pokemons/" + item[0])
          .set({
            ...pokemon,
          })
          .then(() => {
            SetPokemons((prevState) => {
              return { ...prevState, [item[0]]: pokemon };
            });
          });
        return null;
      }
      return null;
    }, {});
  };

  const onAddPokemon = () => {
    const newPostKey = database.ref().child("pokemons").push().key;
    const newPoke = { ...Object.entries(pokemons)[0][1] };
    newPoke.id = Object.entries(pokemons).reduce(
      (max, item) => (item[1].id > max ? item[1].id : max),
      Object.entries(pokemons)[0][1].id
    );
    newPoke.id++;
    newPoke.active = false;
    database
      .ref("pokemons/" + newPostKey)
      .set(newPoke)
      .then(() => {
        SetPokemons((prevState) => {
          return { ...prevState, [newPostKey]: newPoke };
        });
      });
  };

  const syncStateWithDatabase = () => {
    database.ref("pokemons").once("value", (snapshot) => {
      SetPokemons(snapshot.val());
    });
  };

  useEffect(() => {
    syncStateWithDatabase();
  }, []);

  return (
    <div className={s.plug}>
      <Layout
        id="cards"
        title="Cards"
        urlBackground={LayoutBg}
        colorBackground="blue"
      >
        <button onClick={onAddPokemon}>Add pokemon</button>
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { id, type, img, name, values, bgImg, isActive }]) => (
              <PokemonCard
                name={name}
                img={img}
                type={type}
                values={values}
                id={id}
                key={key}
                onClick={onCard}
                isActive={isActive}
              />
            )
          )}
        </div>
      </Layout>
    </div>
  );
};

export default GamePage;
