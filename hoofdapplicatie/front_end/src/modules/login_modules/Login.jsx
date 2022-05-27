import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
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
          <NavLink to="/todos">
            <button className="login__form__buttongroup__button" type="submit">
              To application
            </button>
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Login;
