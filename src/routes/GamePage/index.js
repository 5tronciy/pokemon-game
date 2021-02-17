import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import database from "../../services/firebase";

// import LayoutBg from '../../assets/bg1.jpg';

import s from "./GamePage.module.css";

import PokemonCard from "./../../components/PokemonCard";

const GamePage = () => {
  const [pokemons, SetPokemons] = useState({});

  const onCard = (pokemonId) => {
    SetPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === pokemonId) {
          pokemon.isActive = !pokemon.isActive;
          database.ref("pokemons/" + item[0]).set({
            ...pokemon,
          });
        }
        acc[item[0]] = pokemon;
        return acc;
      }, {});
    });
  };

  const handleAddPokeClick = () => {
    const newPostKey = database.ref().child("pokemons").push().key;
    const newPoke = Object.entries(pokemons)[0][1];
    //TODO: remove
    //TEMP id gen
    newPoke.id =
      Object.entries(pokemons).reduce(
        (max, item) => (item[1].id > max ? item[1].id : max),
        Object.entries(pokemons)[0][1].id
      ) + 1;
    newPoke.active = false;
    //TEMP
    database.ref("pokemons/" + newPostKey).set(newPoke);

    getAll();
  };

  const getAll = () => {
    database.ref("pokemons").once("value", (snapshot) => {
      SetPokemons(snapshot.val());
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className={s.plug}>
      <h1>This is Game</h1>
      <p>Battles will begin soon.</p>
      <button onClick={handleAddPokeClick}>Add pokemon</button>
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
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default GamePage;
