import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import IndexFooter from "../standard_modules/Footer";
import Errormessage from "../extra_modules/Errormessage";
import { saveJWTinCookie } from "../../helpers/jwttokens";
import { errorhandlinglogin } from "../../helpers/errorhandling";
import { useSelector, useDispatch } from "react-redux";
import { clearmessage } from "../../data/message";

const Login = () => {
  //Save the login cookie in the browser, activate dispatch & messagestate
  saveJWTinCookie({ jwt_token_TDL: null });
  const dispatch = useDispatch();
  const { message } = useSelector(
    (state) => state.persistedReducer.messageState
  );

  //Define useStates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [messageService, setMessageService] = useState(message);

  //get navigation
  const nav = useNavigate();

  useEffect(() => {
    if (messageService && messageService.length > 0) {
      setTimeout(() => {
        dispatch(clearmessage());
        setMessageService(null);
      }, 4000);
    }
    return;
  }, []);
  //Handle the user login submit
  async function handleUserloginSubmit(e) {
    //Log the user in
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post(
        "https://wdev2.be/fs_anthonym/eindwerk/api/login_check",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      if ("token" in data) {
        saveJWTinCookie(data.token);
      }

      //Als er userdata is in de data opslagen in localstorage
      if ("userdata" in data) {
        if ("id" in data.userdata) {
          localStorage.setItem("userId", JSON.stringify(data.userdata.id));
        }

        localStorage.setItem("time", JSON.stringify(new Date().toUTCString()));

        //Navigeer door naar de app
        setTimeout(() => {
          return nav("/splashscreen");
        });
      }
    } catch (error) {
      setError(
        errorhandlinglogin(
          error?.response?.status || "The server is currently unavailable"
        )
      );
    }
  }

  return (
    <>
      <section className="container login">
        <div className="login__block">
          <h1 className="login__block__title">
            Welcome to the To Do List application.
          </h1>
          <h2 className="login__block__text">Please log in</h2>
        </div>
        <form className="login__form" onSubmit={handleUserloginSubmit}>
          <label className="login__form__label">
            Username
            <input
              type="text"
              className="login__form__label__textinput form-control"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="login__form__label">
            Password
            <input
              type="password"
              className="login__form__label__textinput form-control"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </label>
          <Errormessage className="error-center">{error}</Errormessage>
          <div className="login__form__buttongroup">
            {messageService && messageService.length > 0 && (
              <p className="message">{messageService}</p>
            )}
            <button
              className="login__form__buttongroup__button btn btn btn-primary"
              type="submit"
            >
              To application
            </button>
            <NavLink to="/register">
              <button className="login__form__buttongroup__button btn btn-primary">
                Register
              </button>
            </NavLink>
          </div>
        </form>
      </section>
      <IndexFooter />
    </>
  );
};

export default Login;
