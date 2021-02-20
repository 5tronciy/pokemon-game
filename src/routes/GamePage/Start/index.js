import { useContext } from "react";

import LayoutBg from "../../../assets/bg1.jpg";

import s from "./Start.module.css";

import PokemonCard from "./../../../components/PokemonCard";
import Layout from "./../../../components/Layout";
import { PokemonContext } from "./../../../context/pokemonContext";

const GamePage = () => {
  const { startGame, onCard, pokemonsSelected, pokemons } = useContext(
    PokemonContext
  );

  const onGameStart = () => {
    startGame && startGame();
  };

  const selectPokemon = (key) => {
    onCard && onCard(key);
  };

  return (
    <Layout urlBackground={LayoutBg}>
      <button
        className={s.startButton}
        disabled={Object.keys(pokemonsSelected).length < 5}
        onClick={onGameStart}
      >
        Start Game
      </button>

      <div className={s.cardContainer}>
        {pokemons &&
          Object.entries(
            pokemons
          ).map(([key, { id, type, img, name, values, bgImg, isSelected }]) => (
            <PokemonCard
              name={name}
              img={img}
              type={type}
              values={values}
              id={id}
              key={key}
              outerKey={key}
              onClick={selectPokemon}
              isActive={true}
              bgImg={bgImg}
              isSelected={isSelected}
              className={s.largeCard}
            />
          ))}
      </div>
    </Layout>
  );
};

export default GamePage;
