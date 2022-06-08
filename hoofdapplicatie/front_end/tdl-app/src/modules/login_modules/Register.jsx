import { NavLink } from "react-router-dom";

const Register = () => {
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
      <form className="login__form">
        <label className="login__form__label">
          Username
          <input
            type="text"
            className="login__form__label__textinput form-control"
          />
        </label>
        <label className="login__form__label">
          Password
          <input
            type="text"
            className="login__form__label__textinput form-control"
          />
        </label>
        <label className="login__form__label">
          Email address
          <input
            type="text"
            className="login__form__label__textinput form-control"
          />
        </label>

        <div className="login__form__buttongroup">
          <NavLink to="/login">
            <button className="login__form__buttongroup__button">
              Register
            </button>{" "}
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Register;
