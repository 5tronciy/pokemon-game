import classNames from "classnames";

import s from "./Navbar.module.css";

const Navbar = ({ handleBurgerClick, isMenuActive }) => {
  const onMenuBtn = (e) => {
    e.preventDefault();
    handleBurgerClick();
  };

  return (
    <nav id={s.navbar} className={!isMenuActive ? s.bgActive : ""}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a
          href="/#"
          onClick={onMenuBtn}
          className={classNames(s.menuButton, isMenuActive && s.active)}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
