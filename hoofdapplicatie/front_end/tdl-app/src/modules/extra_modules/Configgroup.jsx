import { useNavigate} from "react-router";
import { NavLink, useLocation  } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {destroyJWTCookie} from "../../helpers/jwttokens";

const Configgroup = () => {
  
  //Gather information & nav
  const nav = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  //set the active location if the location changes
  useEffect(()=>{setActive(location.pathname);},[location])

  //Logout on door click
  async function handleLogoutClick(e){
    destroyJWTCookie()
    localStorage.clear();
    nav("/login");
  }
  return (
      <> 
    {active != "/phonebook" && 
    <NavLink to="/phonebook" className="configgroup__contacts configgroup__block">
      <span className="configgroup__block__text ">phonebook</span>
    </NavLink>}
    {active != "/todos" && 
    <NavLink to="/todos" className="configgroup__todos configgroup__block">
      <span className="configgroup__block__text">todos</span>
    </NavLink>}
    {active != "/appointments" &&
    <NavLink to="/appointments" className=" configgroup__appointments configgroup__block">
      <span className="configgroup__block__text"> appointments</span>
    </NavLink>}
    {active != "/profile" &&  <NavLink to="/profile" className="configgroup__config configgroup__block">
      <span className="configgroup__block__text">profile</span>
    </NavLink>}
    <a className="configgroup__logout  configgroup__block" onClick={handleLogoutClick}>
      <span className="configgroup__block__text">logout</span>
    </a>
  </>
  )
}

export default Configgroup




  
