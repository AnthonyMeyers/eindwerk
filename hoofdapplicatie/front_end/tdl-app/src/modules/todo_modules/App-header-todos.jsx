import { useEffect, useState } from "react";
import { useAddOnetodoMutation } from "../../data/todoApi";
import Configgroup from "../extra_modules/Configgroup";
import { errorhandlingtodos } from "../../helpers/errorhandling";
import { parseCookies } from "nookies";
import { ToastContainer } from "react-toastify";
import { errorToast } from "../../helpers/toast";

const AppHeaderTodos = () => {
  //Get token & navigation
  const { jwt_token_TDL: token } = parseCookies();

  //Set states
  const [todo, setTodo] = useState("");
  const [addOneTodo] = useAddOnetodoMutation();
  const [error, setError] = useState(null);

  ////Get user id
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (error) {
      errorToast(error);
      setError(null);
    }
  }, [error]);

  //Add a todo
  function handleAddtodoSubmit(e) {
    e.preventDefault();

    const hasError = errorhandlingtodos("todo-title", todo);

    if (!hasError) {
      try {
        setError(null);
        const statusAddTodo = addOneTodo({ id: userId, title: todo, token });
        statusAddTodo.then((resolve) => {
          if ("error" in resolve && "data" in resolve.error) {
            setError(
              resolve?.error?.data?.violations?.[0]?.message ||
                "An error occured"
            );
          } else setTodo("");
        });
      } catch (e) {
        setError("An error has occured.");
      }
    } else setError(hasError);
  }

  return (
    <>
      <header className="header">
        <ToastContainer />
        <div className="header__panel">
          <h1 className="header__panel__title">My To Do List</h1>
          <div className="header__panel__configgroup configgroup">
            <Configgroup />
          </div>
        </div>
        <form className="header__todoform" onSubmit={handleAddtodoSubmit}>
          <label htmlFor="input-todo" className="header__todoform__label">
            <span className="header__todoform__label__text">Add a todo</span>
            <input
              maxLength="22"
              className="header__todoform__label__todoinput form-control form-control-lg"
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
};

export default AppHeaderTodos;
