import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

const IndexHeader = () => {
  //Set state
  const [menu, setMenu] = useState(false);

  //Handle mobile menu click
  const handleMobileClick = () => {
    setMenu(!menu);
  };

  return (
    <header className="headerhome">
      <Helmet>
        <title>The todo list application</title>
        <meta
          name="description"
          content="A todo application which saves todos, contacts and keeps an agenda."
        />
        <meta name="author" content="Meyers Anthony"></meta>
        <meta
          name="keywords"
          content="todo, todos, agenda, contacts, work, application, list, document, free, time, eindwerk"
        ></meta>
      </Helmet>
      ;<h1 className="headerhome__title">TDL webapplication</h1>
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
