import { NavLink } from "react-router-dom";

import s from "./GamePage.module.css";

import { POKEMONS } from "./../../assets/POKEMONS";
import PokemonCard from "./../../components/PokemonCard";

const GamePage = () => {
  return (
    <div className={s.plug}>
      <h1>This is Game</h1>
      <p>Battles will begin soon.</p>
      <>
        {POKEMONS.map((item) => (
          <PokemonCard
            name={item.name}
            img={item.img}
            type={item.type}
            values={item.values}
            id={item.id}
            key={item.id}
          />
        ))}
      </>
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default GamePage;
