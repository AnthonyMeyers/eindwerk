import { NavLink, Routes, Route } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAddOnetodoMutation } from "../../data/todoApi";
import Todo_list from "../todo_modules/Todo_list";

const AppHeaderTodos = () => {
  //Set states
  const [todo, setTodo] = useState("");
  const [addOneTodo] = useAddOnetodoMutation();

  //Add a todo
function handleAddtodoSubmit(e)
{
  e.preventDefault();
    addOneTodo({id: 1,title: todo });
    setTodo("");
}


  return (
    <>
      <header className="header">
        <div className="header__panel">
          <h1 className="header__panel__title">To Do List</h1>
          <NavLink to="/settings" className="header__panel__config">
            <button className="header__panel__config__sublink">
              <span className="header__panel__config__sublink__text">
                configuration
              </span>
            </button>
          </NavLink>
        </div>
        <form className="header__todoform" onSubmit={handleAddtodoSubmit}>
          <label for="input-todo" className="header__todoform__label">
            Add a todo
            <input
              class="header__todoform__label__todoinput form-control form-control-lg"
              type="text"
              id="input-todo"
              autoComplete="off"
              spellCheck="false"
              value={todo}
              onInput={(e) => setTodo(e.target.value)}
            />
          </label>
          <button type="submit" className="header__todoform__addtodo">
            <span className="header__todoform__addtodo__text">
              Add todo submit button
            </span>
          </button>
        </form>
      </header>
    </>
  );
}

export default AppHeaderTodos;