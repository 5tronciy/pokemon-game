import { NavLink } from "react-router-dom";
import { useState } from "react";

import s from "./GamePage.module.css";

import { POKEMONS } from "./../../assets/POKEMONS";
import PokemonCard from "./../../components/PokemonCard";

const GamePage = () => {
  const [pokemonsArr, SetPokemonsArr] = useState(POKEMONS);

  const onCard = (pokemonId) => {
    SetPokemonsArr((state) =>
      state.map((item) =>
        item.id === pokemonId ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className={s.plug}>
      <h1>This is Game</h1>
      <p>Battles will begin soon.</p>
      <div className={s.flex}>
        {pokemonsArr &&
          pokemonsArr.map((item) => (
            <PokemonCard
              name={item.name}
              img={item.img}
              type={item.type}
              values={item.values}
              id={item.id}
              key={item.id}
              onClick={onCard}
              isActive={item.isActive}
            />
          ))}
      </div>
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default GamePage;
