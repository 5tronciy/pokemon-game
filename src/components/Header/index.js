import { useHistory } from "react-router";

import s from "./Header.module.css";

const Header = ({ title, description }) => {
  const history = useHistory();
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.silhouette}></div>
      <div className={s.moon}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{description}</p>
        <button
          className={s.startGameBtn}
          onClick={() => history.push("/game")}
        >
          Start Game
        </button>
      </div>
    </header>
  );
};

export default Header;
