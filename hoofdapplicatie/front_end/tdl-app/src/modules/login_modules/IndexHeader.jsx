import { NavLink } from "react-router-dom"

const IndexHeader = () => {
  return (
    <header className="headerhome">
    <h1 className="headerhome__title">TDL webapplication</h1>
    <ul className="headerhome__list">
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/">Home</NavLink></li>
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/photogallery">Photogallery</NavLink></li>
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/register">Register</NavLink></li>
        <li className="headerhome__list__listitem"><NavLink className="headerhome__list__listitem__link" to="/login">Login</NavLink></li>
    </ul>
    </header>
  )
}

export default IndexHeader