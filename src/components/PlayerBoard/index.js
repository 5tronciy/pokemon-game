import { useState } from "react";
import PokemonCard from "./../PokemonCard";
import cn from "classnames";

import style from "./style.module.css";

const PlayerBoard = ({ player, isMoving, cards, className, onCardClick }) => {
  const [isSelected, setSelected] = useState(null);

  const handleCardClick = (card) => {
    if (isMoving) {
      setSelected(card.id);
      onCardClick && onCardClick({ ...card, player });
    }
  };
  return (
    <>
      {cards &&
        cards.map((item, index) => {
          return (
            <PokemonCard
              key={`${item.id}-${index}`}
              id={item.id}
              type={item.type}
              img={item.img}
              name={item.name}
              values={item.values}
              isActive
              bgImg={item.bgImg}
              isSelected={false}
              possession={item.possession}
              className={cn(style["card-board"], {
                [className]: isSelected === item.id,
              })}
              minimize
              onClick={() => handleCardClick(item)}
            />
          );
        })}
    </>
  );
};

export default PlayerBoard;
