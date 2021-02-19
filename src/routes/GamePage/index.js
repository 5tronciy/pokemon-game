import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { PokemonContext } from "../../context/pokemonContext";
import { DatabaseContext } from "../../context/databaseContext";

import StartPage from "./Start";
import BoardPage from "./Board";
import FinishPage from "./Finish";

const GamePage = () => {
  const match = useRouteMatch();

  const [pokemons, SetPokemons] = useState({});

  const [pokemonsSelected, SetPokemonsSelected] = useState({});

  const history = useHistory();

  const firebase = useContext(DatabaseContext);

  const onGameStart = () => {
    history.push("/game/board");
  };

  const onCard = (outerKey) => {
    if (
      Object.keys(pokemonsSelected).length < 5 ||
      pokemons[outerKey].isSelected
    ) {
      const pokemon = { ...pokemons[outerKey] };

      SetPokemons((prevState) => {
        return {
          ...prevState,
          [outerKey]: {
            ...prevState[outerKey],
            isSelected: !prevState[outerKey].isSelected,
          },
        };
      });
      SetPokemonsSelected((prevState) => {
        if (prevState[outerKey]) {
          const copiedState = { ...prevState };
          delete copiedState[outerKey];
          return copiedState;
        }
        return { ...prevState, [outerKey]: pokemon };
      });
    }
  };

  useEffect(() => {
    firebase.getPokemonsSocket((pokes) => {
      SetPokemons(pokes);
    });
    return () => firebase.offPokemonsSocket();
  }, [firebase]);

  return (
    <PokemonContext.Provider
      value={{
        onCard,
        onGameStart,
        pokemons,
        pokemonsSelected,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
