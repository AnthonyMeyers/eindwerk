import { useEffect, useState } from "react";
import Todo from "./Todo";
import { useGetAllUserTodosQuery } from "../../data/todoApi";
import Status from "../standard_modules/App-Status";
import { parseCookies } from "nookies";
import IndexFooter from "../standard_modules/Footer";
import { ToastContainer, toast } from "react-toastify";
import { errorToast } from "../../helpers/toast";

const Todo_list = () => {
  //Get token & userid
  const { jwt_token_TDL: token } = parseCookies();
  const userId = localStorage.getItem("userId");

  //Set states
  const [activeId, setActiveId] = useState(0);

  //Get all todos of the selected user
  const {
    data: allUserTodos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    isSuccess: isSuccessTodos,
  } = useGetAllUserTodosQuery({ id: userId, token });

  //Adds error toast
  useEffect(() => {
    if (isErrorTodos) {
      errorToast("The server is currently unavailable.");
    }
  }, [allUserTodos]);

  //Pass the clicked item id to the child component
  function handleEditbuttonClick(e) {
    if (["id"] in e.target) setActiveId(e.target.id);
  }

  return (
    <>
      <section className="container todos" onClick={handleEditbuttonClick}>
        <ToastContainer />
        <h2 className="todos__title">Active todos</h2>
        <Status isLoading={isLoadingTodos} />
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
