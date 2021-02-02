import classNames from "classnames";

import s from "./Navbar.module.css";

const Navbar = ({ handleBurgerClick, isMenuActive }) => {
  return (
    <nav id={s.navbar} className={!isMenuActive ? s["bg-active"] : ""}>
      <div className={s["nav-wrapper"]}>
        <p className={s.brand}>Mbx</p>
        <span
          onClick={handleBurgerClick}
          className={classNames(s["menu-button"], isMenuActive && s.active)}
        >
          <span />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
