import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router";
import {useState, useEffect} from "react";
import axios from "axios";
import {useJwt} from "react-jwt";

const Login = () => {

//Define useStates
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

//get navigation
const nav = useNavigate();

//Handle the user login submit
async function handleUserloginSubmit(e)
{

  e.preventDefault();
  try{
  const {data: {token}} = await axios.post("http://localhost:8001/api/login_check", {
    username,
    password,
  }
  )
  const {decodedToken, isExpired} = useJwt(token);
  console.log(isExpired);


}catch(error){}

  /*nav("/todos");*/
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
        <button className="login__form__buttongroup__button" type="submit">
              To application
            </button>
          <NavLink to="/register">
            <button className="login__form__buttongroup__button">
              Register
            </button>
          </NavLink>

        </div>
      </form>
    </section>
    </>
  );
};

export default Login;
