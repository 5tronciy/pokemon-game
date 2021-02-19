import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../components/PokemonCard";
import { PokemonContext } from "../../../context/pokemonContext";

import s from "./style.module.css";
import ArrowChoice from "../../../components/ArrowChoice";
import PlayerBoard from "../../../components/PlayerBoard";

const processPlayersScore = (board, player, oponent) => {
  let playerScore = player.length;
  let oponentScore = oponent.length;
  board.forEach((item) => {
    if (item.card) {
      if (item.card.possession === "blue") {
        playerScore += 1;
      } else if (item.card.possession === "red") {
        oponentScore += 1;
      }
    }
  });

  return [playerScore, oponentScore];
};

const postMove = async (params) => {
  const response = await fetch(
    "https://reactmarathon-api.netlify.app/api/players-turn",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  return (await response.json()).data;
};

const BoardPage = () => {
  const history = useHistory();
  const [board, SetBoard] = useState([]);
  const {
    pokemonsSelected,
    goToFinishPage,
    makePlayerWon,
    oponentsHand,
  } = useContext(PokemonContext);
  if (Object.keys(pokemonsSelected).length < 1) {
    history.replace("/game");
  }
  const [steps, setSteps] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(() =>
    Math.floor(Math.random() * Math.floor(2)) === 1 ? true : false
  );
  const [player, setPlayer] = useState(() => {
    return Object.values(pokemonsSelected).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });
  const [oponent, setOponent] = useState(() => {
    return oponentsHand.map((item) => ({ ...item, possession: "red" }));
  });
  const [choosenCard, setChoosenCard] = useState(null);
  const syncBoard = async () => {
    const boardResp = await fetch(
      "https://reactmarathon-api.netlify.app/api/board"
    );
    const boardData = await boardResp.json();
    SetBoard(boardData.data);
  };

  useEffect(() => {
    syncBoard();
  }, []);

  const updateMoverHand = (player, cardId) => {
    if (player === 1) {
      setPlayer((prevSate) => prevSate.filter((item) => item.id !== cardId));
    } else if (player === 2) {
      setOponent((prevState) => prevState.filter((item) => item.id !== cardId));
    }
  };

  const onBoardPlate = async (position) => {
    if (choosenCard) {
      updateMoverHand(choosenCard.player, choosenCard.id);
      SetBoard(await postMove({ position, card: choosenCard, board }));
      setChoosenCard(null);
      setSteps((prevState) => {
        const curStep = prevState + 1;
        return curStep;
      });
    }
  };

  useEffect(() => {
    const chooseWinner = () => {
      if (steps === 9) {
        const [playerScore, oponentScore] = processPlayersScore(
          board,
          player,
          oponent
        );
        if (playerScore > oponentScore) {
          makePlayerWon();
        }
        goToFinishPage();
      }
    };
    setIsPlayerTurn((prevSate) => !prevSate);
    chooseWinner();
  }, [board, goToFinishPage, makePlayerWon, oponent, player, steps]);

  const onCard = (card) => {
    setChoosenCard(card);
  };

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          isMoving={isPlayerTurn}
          cards={player}
          className={s.selectedCard}
          onCardClick={onCard}
        />
      </div>
      <ArrowChoice side={isPlayerTurn ? 1 : 2} />
      <div className={s.board}>
        {board &&
          board.map((item) => {
            return (
              <div
                className={s.boardPlate}
                key={item.position}
                onClick={() => !item.card && onBoardPlate(item.position)}
              >
                {item.card && (
                  <PokemonCard
                    {...item.card}
                    className={s.cardOnPlate}
                    isActive
                    minimize
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          isMoving={!isPlayerTurn}
          cards={oponent}
          className={s.selectedCard}
          onCardClick={onCard}
        />
      </div>
    </div>
  );
};

export default BoardPage;
