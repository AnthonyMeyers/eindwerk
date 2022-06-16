import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router";
import {useState, useEffect} from "react";
import axios from "axios";
import IndexFooter from "./IndexFooter";
import Errormessage from "../extra_modules/Errormessage";
import { saveJWTinCookie } from "../../helpers/jwttokens";
import { errorhandlinglogin } from "../../helpers/errorhandling";

const Login = () => {
  saveJWTinCookie({jwt_token_TDL: ""});
  //Define useStates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  //get navigation
  const nav = useNavigate();

  //Handle the user login submit
  async function handleUserloginSubmit(e)
  {

    //Log the user in
    e.preventDefault();
    setError(null);
    try{
    const {data} = await axios.post("https://wdev2.be/fs_anthonym/eindwerk/api/login_check", {
      username,
      password,
    }, 
    {
      headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    }}
    )
    let a = false;
    let b = false;
    let c = false;
    if("token" in data)
    {

      saveJWTinCookie(data.token);
    }
    
    //Als er userdata is in de data opslagen in localstorage
    if("userdata" in data){
      if("id" in data.userdata){
        localStorage.setItem("userId",JSON.stringify(data.userdata.id))
    }

  //Als er rollen zijn in userdata, opslagen in localstorage
    if("roles" in data.userdata){
      localStorage.setItem("roles",JSON.stringify(data.userdata.roles)) 
    }
  //Navigeer door naar de app
  nav("/splashscreen");
}

  }catch(error){
    console.log(error);
    setError(errorhandlinglogin(error.response.status));
  }
  }

  return (
    <>
      <section className="container login">
        <div className="login__block">
          <h1 className="login__block__title">Welcome to the To Do List application.</h1>
          <p className="login__block__text">Please take a moment to login / register to start your personal To Do It experience
          </p>
        </div>
        <form className="login__form" onSubmit={handleUserloginSubmit}>
          <label className="login__form__label">Username
            <input type="text" className="login__form__label__textinput form-control"
            value={username}onInput={(e)=> setUsername(e.target.value) }/>
          </label>
          <label className="login__form__label">Password
            <input type="password" className="login__form__label__textinput form-control"
            value={password} onInput={(e)=> setPassword(e.target.value) }/>
          </label>
          <Errormessage className="error-center">{error}</Errormessage>
          <div className="login__form__buttongroup">
            <button className="login__form__buttongroup__button btn btn btn-primary" type="submit">To application
            </button>
          <NavLink to="/register">
            <button className="login__form__buttongroup__button btn btn-primary">Register</button>
          </NavLink>
        </div>
      </form>
    </section>
    <IndexFooter/>
  </>
)
}

export default Login;
