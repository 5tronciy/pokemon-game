import { useContext } from "react";

import LayoutBg from "../../../assets/bg1.jpg";

import s from "./Start.module.css";

import PokemonCard from "./../../../components/PokemonCard";
import Layout from "./../../../components/Layout";
import { PokemonContext } from "./../../../context/pokemonContext";

const GamePage = () => {
  const resources = useContext(PokemonContext);

  const onGameStart = () => {
    resources.onGameStart && resources.onGameStart();
  };

  return (
    <Layout urlBackground={LayoutBg}>
      <button
        className={s.startButton}
        disabled={resources.pokemonsSelected.length < 5}
        onClick={onGameStart}
      >
        Start Game
      </button>

      <div className={s.cardContainer}>
        {resources.pokemons &&
          Object.entries(
            resources.pokemons
          ).map(([key, { id, type, img, name, values, bgImg, isSelected }]) => (
            <PokemonCard
              name={name}
              img={img}
              type={type}
              values={values}
              id={id}
              key={key}
              onClick={resources.onCard}
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
