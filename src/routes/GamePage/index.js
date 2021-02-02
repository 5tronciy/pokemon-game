import { NavLink } from "react-router-dom";

import s from "./GamePage.module.css";

const GamePage = () => {
  return (
    <div className={s.plug}>
      <h1>This is Game</h1>
      <p>Battles will begin soon.</p>
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default GamePage;
