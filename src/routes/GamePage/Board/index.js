import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../components/PokemonCard";
import { PokemonContext } from "../../../context/pokemonContext";

import s from "./style.module.css";

const BoardPage = () => {
  const history = useHistory();
  const [board, SetBoard] = useState([]);
  const [oponent, setOponent] = useState([]);
  const { pokemonsSelected } = useContext(PokemonContext);
  if (Object.keys(pokemonsSelected).length < 1) {
    history.replace("/game");
  }
  const syncBoard = async () => {
    const boardResp = await fetch(
      "https://reactmarathon-api.netlify.app/api/board"
    );
    const boardData = await boardResp.json();
    SetBoard(boardData.data);
  };

  const initOponent = async () => {
    const oponentResp = await fetch(
      "https://reactmarathon-api.netlify.app/api/create-player"
    );
    const oponentData = await oponentResp.json();
    setOponent(oponentData.data);
  };

  useEffect(() => {
    syncBoard();

    initOponent();
  }, []);

  const onBoardPlate = (position) => {
    console.log(position);
  };

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
        {board &&
          board.map((item) => {
            return (
              <div
                className={s.boardPlate}
                key={item.position}
                onClick={() => !item.card && onBoardPlate(item.position)}
              >
                {item.card && <PokemonCard {...item} minimize />}
              </div>
            );
          })}
      </div>
      <div className={s.playerTwo}>
        {oponent &&
          oponent.map(({ id, type, img, name, values, bgImg }, index) => (
            <PokemonCard
              key={`${id}-${index}`}
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
    </div>
  );
};

export default BoardPage;
