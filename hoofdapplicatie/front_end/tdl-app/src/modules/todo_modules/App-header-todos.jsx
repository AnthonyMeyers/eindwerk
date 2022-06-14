import { NavLink, Routes, Route } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAddOnetodoMutation } from "../../data/todoApi";
import axios from "axios";
import { useNavigate } from "react-router";
import Configgroup from "../extra_modules/configgroup";
import { errorhandlingtodos } from "../../helpers/errorhandling";
import Errormessage from "../extra_modules/Errormessage";

const AppHeaderTodos = () => {
  //Set states
  const [todo, setTodo] = useState("");
  const [addOneTodo,] = useAddOnetodoMutation();
  const [error, setError] = useState(null);

  //set Navigation
  const nav = useNavigate();

  ////Get user id
  const userId = localStorage.getItem("userId");

  //Add a todo
function handleAddtodoSubmit(e)
{
  e.preventDefault();
  const hasError = errorhandlingtodos("todo-title",todo);

    if(!hasError){
      try{
        setError(null);
    addOneTodo({id: userId,title: todo });
    setTodo("");
  }   
    catch(e){setError("An error has occured.")}
  }else setError(hasError);
    
}

  return (
    <>
      <header className="header">
        <div className="header__panel">
          <h1 className="header__panel__title">To Do List</h1>
          <div className="header__panel__configgroup configgroup">
          <Configgroup/>
          </div>
        </div>
        <form className="header__todoform" onSubmit={handleAddtodoSubmit}>
          <label htmlFor="input-todo" className="header__todoform__label">
            Add a todo
            <input
              className="header__todoform__label__todoinput form-control form-control-lg"
              type="text"
              id="input-todo"
              autoComplete="off"
              spellCheck="false"
              value={todo}
              onInput={(e) => setTodo(e.target.value)}
            />
          </label>
          <Errormessage className={"error-center"}>{error}</Errormessage>
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