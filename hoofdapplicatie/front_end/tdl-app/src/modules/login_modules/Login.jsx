import { NavLink } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const Login = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

async function handleUserloginSubmit(e)
{
  e.preventDefault();
  const response = await axios.post("https://wdev2.be/fs_anthonym/eindwerk", {
    username,
    password,
  })
}

  return (
<>
    <section className="login">
      <div className="login__block">
        <h1 className="login__block__title">
          Welcome to the To Do List application.
        </h1>
        <p className="login__block__text">
          Please take a moment to login / register to start your personal To Do
          It experience
        </p>
      </div>
      <form className="login__form" onSubmit={handleUserloginSubmit}>
        <label className="login__form__label">
          Username
          <input
            type="text"
            className="login__form__label__textinput form-control"
            value={username}
            onInput={(e)=> setUsername(e.target.value) }
          />
        </label>
        <label className="login__form__label">
          Password
          <input
            type="password"
            className="login__form__label__textinput form-control"
            value={password}
            onInput={(e)=> setPassword(e.target.value) }
          />
        </label>
        <label className="login__form__label">
          Stay logged in
          <input
            type="checkbox"
            className="login__form__label__checkboxinput"
          />
        </label>
        <div className="login__form__buttongroup">
          <NavLink to="/register">
            <button className="login__form__buttongroup__button">
              Register
            </button>
          </NavLink>
            <button className="login__form__buttongroup__button" type="submit">
              To application
            </button>
        </div>
      </form>
    </section>
    </>
  );
};

export default Login;
