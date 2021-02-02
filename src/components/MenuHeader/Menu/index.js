import { NavLink } from "react-router-dom";
import classNames from "classnames";

import s from "./Menu.module.css";

const Menu = ({ isMenuActive, handleLinkClick }) => {
  const MenuItems = [
    { title: "Home", to: "/" },
    { title: "Game", to: "/game" },
    { title: "About", to: "/about" },
    { title: "Contact", to: "/contact" },
  ];

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
          {MenuItems.map((item) => (
            <li key={item.title + item.to}>
              <NavLink
                exact
                to={item.to}
                activeClassName={s.active}
                className={s["nav-link"]}
                onClick={handleLinkClick}
              >
                {item.title}
              </NavLink>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
