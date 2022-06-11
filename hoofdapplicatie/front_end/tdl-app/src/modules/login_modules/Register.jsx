import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../data/todoApi";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);

  const nav = useNavigate();
//Register user
const [registerUser,serverAnswer] = useRegisterUserMutation();

  function handleRegisteruserSubmit(e)
  {
    e.preventDefault();
    if(hasAgreed){

    registerUser({username, password, email, hasAgreed})
  }
  }

  useEffect(()=>{
if("isSuccess" in serverAnswer && serverAnswer.isSuccess)
{
  nav("/");
}

  },[serverAnswer])

  return (
    <section className="login">
      <div className="login__block">
        <h1 className="login__block__title">Register</h1>
      </div>
      <p className="login__block__text">
        By registering for this application, you agree that your data will be
        collected. Your data will only be used for the functionality of this
        application.
      </p>
      <form className="login__form" onSubmit={handleRegisteruserSubmit}>
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
            type="text"
            className="login__form__label__textinput form-control"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="login__form__label">
          Email address
          <input
            type="text"
            className="login__form__label__textinput form-control"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="login__form__label">
          Please confirm that you have read our user agreement before continueing.
          <input
            type="checkbox"
            value={hasAgreed}
            onInput={() => setHasAgreed(!hasAgreed)}
          />
        </label>

        <div className="login__form__buttongroup">
            <button className="login__form__buttongroup__button">
              Register
            </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
