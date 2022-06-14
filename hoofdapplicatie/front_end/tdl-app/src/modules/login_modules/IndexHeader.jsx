import { NavLink } from "react-router-dom"
import { useState } from "react";

const IndexHeader = () => {
  const [menu, setMenu] = useState(false);

  const handleMobileClick = () => {
    setMenu(!menu);
  };
  const handleListitemClick = () => {
    setMenu(false);
  };

  return (
    <header className="headerhome">
    <h1 className="headerhome__title" >TDL webapplication</h1>
    <a className={menu ? "headerhome__mobile headerhome__mobile-active" : "headerhome__mobile"} onClick={handleMobileClick}></a>
    <ul className={menu ? "headerhome__list hide " : "headerhome__list"} id="navbar">
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/">Home</NavLink></li>
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/photogallery">Photogallery</NavLink></li>
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/register">Register</NavLink></li>
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/login">Login</NavLink></li>
    </ul>
    </header>
  )
}

export default IndexHeader