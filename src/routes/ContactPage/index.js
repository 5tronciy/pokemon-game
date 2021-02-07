import { NavLink } from "react-router-dom";

import s from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <div className={s.plug}>
      <h1>Contacts</h1>
      <NavLink exact to="/" activeClassName="active" className={s["nav-link"]}>
        Back to Home
      </NavLink>
    </div>
  );
};

export default ContactPage;
