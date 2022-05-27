import { NavLink, Routes, Route } from "react-router-dom";
import Todo_list from "../todo_modules/Todo_list";
import AppNavigation from "./App-Navigation";
export default function AppHeader() {
  return (
    <>
      <header className="header">
        <div className="header__panel">
          <h1 className="header__panel__title">To Do List</h1>
          <NavLink to="/settings" className="header__panel__config">
            <a className="header__panel__config__sublink">
              <span className="header__panel__config__sublink__text">
                configuration
              </span>
            </a>
          </NavLink>
        </div>
        <form className="header__todoform">
          <label for="input-todo" className="header__todoform__label">
            Add a todo
            <input
              class="header__todoform__label__todoinput form-control form-control-lg"
              type="text"
              id="input-todo"
              autoComplete="off"
              spellCheck="false"
            />
          </label>
          <button type="button" className="header__todoform__addtodo">
            <span className="header__todoform__addtodo__text">
              Add todo submit button
            </span>
          </button>
        </form>
      </header>
      <AppNavigation />
      <main className="container">
        <Routes>
          <Route path="/" element={<Todo_list />} />
        </Routes>
      </main>
    </>
  );
}
