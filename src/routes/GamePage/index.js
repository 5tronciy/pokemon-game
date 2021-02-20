import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";

import { PokemonContext } from "../../context/pokemonContext";
import { DatabaseContext } from "../../context/databaseContext";

import StartPage from "./Start";
import BoardPage from "./Board";
import FinishPage from "./Finish";

const GamePage = () => {
  const match = useRouteMatch();
  const [isGameFinished, SetGameFinished] = useState(false);
  const [isPlayerWon, SetPlayerWon] = useState(false);
  const [oponentsHand, SetOponentsHand] = useState([]);
  const [pokemons, SetPokemons] = useState({});

  const [pokemonsSelected, SetPokemonsSelected] = useState({});

  const history = useHistory();

  const firebase = useContext(DatabaseContext);

  const startGame = () => {
    history.push("/game/board");
  };

  const goToFinishPage = () => {
    SetGameFinished(true);
    history.push("/game/finish");
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

  const endGame = (card) => {
    if (card) {
      const pokeToAdd = { ...card };
      delete pokeToAdd.isSelected;
      firebase.addPokemon(pokeToAdd);
    }
    history.replace("/game");
    resetData();
  };

  const makePlayerWon = () => {
    SetPlayerWon(true);
  };

  const initOponent = async () => {
    const oponentResp = await fetch(
      "https://reactmarathon-api.netlify.app/api/create-player"
    );
    const oponentData = await oponentResp.json();
    SetOponentsHand(
      oponentData.data.map((item) => ({ ...item, possession: "red" }))
    );
  };

  const resetData = useCallback(async () => {
    SetPokemons(await firebase.getPokemonsOnceAsync());
    SetPokemonsSelected({});
    SetGameFinished(false);
    SetPlayerWon(false);
    initOponent();
  }, [firebase]);

  useEffect(() => {
    firebase.getPokemonsSocket((pokes) => {
      SetPokemons(pokes);
    });
    resetData();
    return () => firebase.offPokemonsSocket();
  }, [firebase, resetData]);

  return (
    <PokemonContext.Provider
      value={{
        onCard,
        startGame,
        pokemons,
        pokemonsSelected,

        oponentsHand,
        isGameFinished,
        isPlayerWon,
        goToFinishPage,
        endGame,
        makePlayerWon,
      }}
    >
      <Switch>
        <Route exact path={`${match.path}/`} component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
