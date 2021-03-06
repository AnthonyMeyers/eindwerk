import { NavLink } from "react-router-dom";
import { useState } from "react";

const IndexHeader = () => {
  //Set state
  const [menu, setMenu] = useState(false);

  //Handle mobile menu click
  const handleMobileClick = () => {
    setMenu(!menu);
  };

  return (
    <header className="headerhome">
      <h1 className="headerhome__title">TDL webapplication</h1>
      <a
        className={
          menu
            ? "headerhome__mobile headerhome__mobile-active"
            : "headerhome__mobile"
        }
        onClick={handleMobileClick}
      ></a>
      <ul
        className={menu ? "headerhome__list" : "headerhome__list hide"}
        id="navbar"
      >
        <li className="headerhome__list__listitem">
          <NavLink className="headerhome__list__listitem__link" to="/">
            Home
          </NavLink>
        </li>
        <li className="headerhome__list__listitem">
          <NavLink
            className="headerhome__list__listitem__link"
            to="/photogallery"
          >
            Photogallery
          </NavLink>
        </li>
        <li className="headerhome__list__listitem">
          <NavLink className="headerhome__list__listitem__link" to="/register">
            Register
          </NavLink>
        </li>
        <li className="headerhome__list__listitem">
          <NavLink className="headerhome__list__listitem__link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default IndexHeader;
