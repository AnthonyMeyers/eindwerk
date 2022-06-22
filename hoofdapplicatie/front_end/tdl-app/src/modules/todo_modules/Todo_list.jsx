import { useState } from "react";
import Todo from "./Todo";
import { useGetAllUserTodosQuery } from "../../data/todoApi";
import Status from "../standard_modules/App-Status";
import { parseCookies } from "nookies";
import IndexFooter from "../standard_modules/Footer";

const Todo_list = () => {
  const { jwt_token_TDL: token } = parseCookies();
  const userId = localStorage.getItem("userId");
  const [activeId, setActiveId] = useState(0);

  const {
    data: allUserTodos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    isSuccess: isSuccessTodos,
  } = useGetAllUserTodosQuery({ userId, token });

  function handleEditbuttonClick(e) {
    if (["id"] in e.target) setActiveId(e.target.id);
  }

  return (
    <>
      <section className="container todos" onClick={handleEditbuttonClick}>
        <h2 className="todos__title">Active todos:</h2>
        <Status isLoading={isLoadingTodos} isError={isErrorTodos} />
        {allUserTodos && allUserTodos.length > 0 && (
          <ul className="todos__todolist">
            {allUserTodos.map((todo) => (
              <li key={todo.id} className="todos__todolist__item">
                <Todo todo={todo} activeId={activeId} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <IndexFooter />
    </>
  );
};

export default Todo_list;
