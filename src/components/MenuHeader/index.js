import { useState } from "react";

import Menu from "./Menu";
import Navbar from "./Navbar";

const MenuHeader = () => {
  const [isMenuActive, setMenuActive] = useState(false);

  const handleBurgerClick = () =>
    setMenuActive((isMenuActive) => !isMenuActive);

  return (
    <>
      <Navbar
        isMenuActive={isMenuActive}
        handleBurgerClick={handleBurgerClick}
      />
      <Menu isMenuActive={isMenuActive} handleLinkClick={handleBurgerClick} />
    </>
  );
};

export default MenuHeader;
