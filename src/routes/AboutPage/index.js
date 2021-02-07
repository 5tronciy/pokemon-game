import { NavLink } from "react-router-dom";

import s from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={s.plug}>
      <h1>About</h1>
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default AboutPage;
