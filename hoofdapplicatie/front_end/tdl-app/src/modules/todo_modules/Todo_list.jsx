import { useEffect, useState } from "react";
import Todo from "./todo";
import { useGetAllUserInfoQuery, useGetAllUserTodosQuery} from "../../data/todoApi";
import Status from "../standard_modules/App-Status";


const Todo_list = () => {
  const {data: userData, isLoading, isError, isSuccess} = useGetAllUserInfoQuery(1);
  const {data: allUserTodos, isLoading: isLoadingTodos,
    isError: isErrorTodos, isSuccess: isSuccessTodos}
    = useGetAllUserTodosQuery(1);



  /*useEffect(()=>{console.log(allUserTodos)},[isSuccessTodos])*/
  return (
    <>
    <section className="todos">
      <h2 className="todos__title">Active todos:</h2>
      <Status isLoading={isLoadingTodos} isError={isErrorTodos}/>
      { allUserTodos && allUserTodos.length > 0  && (
        <ul className="todos__todolist">
          {allUserTodos.map((todo) => (
              <li key={todo.id} className="todos__todolist__item">
                <Todo todo={todo}/>
              </li>
            ))}
        </ul>
      )}
    </section>
    </>
  );
};

export default Todo_list;
