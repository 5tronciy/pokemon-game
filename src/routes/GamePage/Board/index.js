import { useContext } from "react";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../components/PokemonCard";
import { PokemonContext } from "../../../context/pokemonContext";

import s from "./style.module.css";

const BoardPage = () => {
  const { pokemonsSelected } = useContext(PokemonContext);
  const history = useHistory();

  if (Object.keys(pokemonsSelected).length < 1) {
    history.replace("/game");
  }
  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {pokemonsSelected &&
          Object.entries(
            pokemonsSelected
          ).map(([key, { id, type, img, name, values, bgImg }]) => (
            <PokemonCard
              key={key}
              id={id}
              type={type}
              img={img}
              name={name}
              values={values}
              bgImg={bgImg}
              isActive={true}
              minimize={true}
              isSelected={false}
              className={s.card}
              onClick={() => console.log("clicked")}
            />
          ))}
      </div>
      <div className={s.board}>
        <div className={s.boardPlate}>1</div>
        <div className={s.boardPlate}>2</div>
        <div className={s.boardPlate}>3</div>
        <div className={s.boardPlate}>4</div>
        <div className={s.boardPlate}>5</div>
        <div className={s.boardPlate}>6</div>
        <div className={s.boardPlate}>7</div>
        <div className={s.boardPlate}>8</div>
        <div className={s.boardPlate}>9</div>
      </div>
    </div>
  );
};

export default BoardPage;
