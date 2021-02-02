import { NavLink } from "react-router-dom";
import classNames from "classnames";

import s from "./Menu.module.css";

const Menu = ({ isMenuActive, handleLinkClick }) => {
  return (
    <div
      className={classNames(
        s["menu-container"],
        isMenuActive ? s.active : s.deactive
      )}
    >
      <div className={s.overlay} />
      <div className={s["menu-items"]}>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeClassName={s.active}
              className={s["nav-link"]}
              onClick={handleLinkClick}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/game"
              activeClassName={s.active}
              className={s["nav-link"]}
              onClick={handleLinkClick}
            >
              GAME
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/about"
              activeClassName={s.active}
              className={s["nav-link"]}
              onClick={handleLinkClick}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/contact"
              activeClassName={s.active}
              className={s["nav-link"]}
              onClick={handleLinkClick}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
