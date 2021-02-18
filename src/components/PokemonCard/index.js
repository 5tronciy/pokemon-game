import classNames from "classnames";

import s from "./PokemonCard.module.css";

import cardBackSide from "./assets/card-back-side.jpg";

const PokemonCard = ({
  name,
  img,
  id,
  type,
  values,
  onClick,
  isActive,
  minimize,
  className,
  isDisabled = false,
}) => {
  const onPokemonCard = () => {
    onClick && onClick(id);
  };
  return (
    <div
      className={classNames(className)}
      onClick={!isDisabled ? onPokemonCard : null}
    >
      <div className={classNames(s.pokemonCard, isActive ? s.active : "")}>
        <div className={s.cardFront}>
          <div className={classNames(s.wrap, s.front)}>
            <div className={classNames(s.pokemon, s[type])}>
              <div className={s.values}>
                <div className={classNames(s.count, s.top)}>{values.top}</div>
                <div className={classNames(s.count, s.right)}>
                  {values.right}
                </div>
                <div className={classNames(s.count, s.bottom)}>
                  {values.bottom}
                </div>
                <div className={classNames(s.count, s.left)}>{values.left}</div>
              </div>
              <div className={s.imgContainer}>
                <img src={img} alt={name} />
              </div>
              {!minimize && (
                <div className={s.info}>
                  <span className={s.number}>#{id}</span>
                  <h3 className={s.name}>{name}</h3>
                  <small className={s.type}>
                    Type: <span>{type}</span>
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={s.cardBack}>
          <div className={classNames(s.wrap, s.back)}>
            <img src={cardBackSide} alt="Сard Backed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
