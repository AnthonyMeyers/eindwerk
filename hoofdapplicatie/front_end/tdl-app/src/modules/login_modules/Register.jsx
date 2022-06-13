import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../data/todoApi";
import axios from "axios";
import IndexFooter from "./IndexFooter";


const Register = () => {

  //Set useStates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);

  //Set navigate
  const nav = useNavigate();

  //Register user
  const [registerUser,serverAnswer] = useRegisterUserMutation();

  async function handleRegisteruserSubmit(e)
  {
    e.preventDefault();
    if(hasAgreed){
    registerUser({username, password, email, hasAgreed})
    }
  }

  //Als de registratie is geslaagd ga terug naar de login.
  useEffect(()=>{
  if("isSuccess" in serverAnswer && serverAnswer.isSuccess)
  {
    nav("/login");
  }

  },[serverAnswer])

  return (
    <>
    <section className="container register">
      <div className="register__block">
        <h1 className="register__block__title">Register</h1>
      </div>
        <p className="register__block__text">
        By registering for this application, you agree that your data will be
        collected. Your data will only be used for the functionality of this
        application.
        </p>
      <form className="register__form" onSubmit={handleRegisteruserSubmit}>
        <label className="register__form__label">Username
          <input type="text" className="register__form__label__textinput form-control"
            value={username} onInput={(e) => setUsername(e.target.value)}/>
          </label>
          <label className="register__form__label">Password
            <input type="text" className="register__form__label__textinput form-control"
            value={password} onInput={(e) => setPassword(e.target.value)}/>
          </label>
          <label className="register__form__label">Email address
            <input type="text" className="register__form__label__textinput form-control"
            value={email} onInput={(e) => setEmail(e.target.value)}/>
          </label>
          <label className="register__form__label">Please confirm that you have read our user agreement before continueing.
            <input type="checkbox" value={hasAgreed}
            onInput={() => setHasAgreed(!hasAgreed)}/>
          </label>
        <div className="register__form__buttongroup">
          <button className="register__form__buttongroup__button btn btn-primary">Register
          </button>
        </div>
      </form>
    </section>
    <IndexFooter/>
    </>
  );
};

export default Register;
