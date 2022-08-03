import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogout } from "../../customhooks/useLogout";
import { Helmet } from "react-helmet";

const Configgroup = () => {
  //Get custom logout hook & function
  const logout = useLogout();

  //Gather information
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  //set the active location if the location changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>The tdl app application</title>
        <meta name="description" content="the todo list application itself" />
      </Helmet>
      {active != "/phonebook" && (
        <NavLink
          to="/phonebook"
          className="configgroup__contacts configgroup__block"
        >
          <span className="configgroup__block__text ">phonebook</span>
        </NavLink>
      )}
      {active != "/todos" && (
        <NavLink to="/todos" className="configgroup__todos configgroup__block">
          <span className="configgroup__block__text">todos</span>
        </NavLink>
      )}
      {active != "/appointments" && (
        <NavLink
          to="/appointments"
          className=" configgroup__appointments configgroup__block"
        >
          <span className="configgroup__block__text"> appointments</span>
        </NavLink>
      )}
      {active != "/profile" && (
        <NavLink
          to="/profile"
          className="configgroup__config configgroup__block"
        >
          <span className="configgroup__block__text">profile</span>
        </NavLink>
      )}
      <a
        className="configgroup__logout  configgroup__block"
        onClick={() => logout()}
      >
        <span className="configgroup__block__text">logout</span>
      </a>
    </>
  );
};

export default Configgroup;
