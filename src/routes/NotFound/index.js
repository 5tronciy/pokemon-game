import { NavLink } from "react-router-dom";

import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.plug}>
      <h1>404</h1>
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
