import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import database from "../../services/firebase";
import { PokemonContext } from "../../context/pokemonContext";

import StartPage from "./Start";
import BoardPage from "./Board";
import FinishPage from "./Finish";

const GamePage = () => {
  const match = useRouteMatch();

  const [pokemons, SetPokemons] = useState({});

  const [pokemonsSelected, SetPokemonsSelected] = useState([]);

  const history = useHistory();

  const onGameStart = () => {
    history.push("/game/board");
  };

  const onCard = (pokemonId) => {
    Object.entries(pokemons).reduce((acc, item) => {
      if (item[1].id === pokemonId) {
        const pokemon = { ...item[1] };
        if (
          pokemonsSelected.length < 5 &&
          !pokemonsSelected.some((i) => i.id === pokemonId)
        ) {
          pokemon.isSelected = !pokemon.isSelected;
          SetPokemons((prevState) => {
            return { ...prevState, [item[0]]: pokemon };
          });
          SetPokemonsSelected((prevState) => {
            return [...prevState, { ...pokemon }];
          });
        } else if (
          pokemonsSelected.length > 0 &&
          pokemonsSelected.some((i) => i.id === pokemonId)
        ) {
          pokemon.isSelected = !pokemon.isSelected;
          SetPokemons((prevState) => {
            return { ...prevState, [item[0]]: pokemon };
          });
          SetPokemonsSelected((prevState) =>
            prevState.filter((i) => i.id !== pokemonId)
          );
        }
      }
      return null;
    }, {});
  };

  const syncStateWithDatabase = () => {
    database.ref("pokemons").once("value", (snapshot) => {
      SetPokemons(snapshot.val());
    });
  };

  useEffect(() => {
    syncStateWithDatabase();
  }, []);

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
