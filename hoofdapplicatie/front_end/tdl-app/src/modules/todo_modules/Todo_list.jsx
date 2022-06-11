import { useEffect, useState } from "react";
import Todo from "./todo";
import { useGetAllUserInfoQuery, useGetAllUserTodosQuery} from "../../data/todoApi";
import Status from "../standard_modules/App-Status";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { loadCategories,loadPriorities } from "../../data/general";

const Todo_list = () => {
  const dispatch = useDispatch();
  const {categories, priorities} = useSelector((state)=> state.generalState);

  const {data: userData, isLoading, isError, isSuccess} = useGetAllUserInfoQuery(9);

  const {data: allUserTodos, isLoading: isLoadingTodos,
    isError: isErrorTodos, isSuccess: isSuccessTodos}
    = useGetAllUserTodosQuery(9);

    useEffect(()=>{

      if(!categories || categories.length === 0 && !priorities || priorities.length === 0)
      {
        (async()=>{const {data:gen_categories} = await axios('https://wdev2.be/fs_anthonym/eindwerk/api/categories.json?pagination=false');
        dispatch(loadCategories({categories: gen_categories}));
        const {data:gen_priorities} = await axios('https://wdev2.be/fs_anthonym/eindwerk/api/priorities.json?pagination=false');
        dispatch(loadPriorities({priorities: gen_priorities}));
      })()
    }
    },[])

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
