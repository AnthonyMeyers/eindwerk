import React from "react";
import {useState, useEffect} from "react";
import { useUpdateIsCheckedTodoMutation, useUpdateTitleTodoMutation, useRemoveOneTodoMutation } from "../../data/todoApi";
import { useSelector } from "react-redux";

const todo = ({todo: {id, tdoTitle, tdoIsDone, tdoPty, tdoCty}}) => {
  //Usestates / getstates
  const [isChecked, setIsChecked] = useState(tdoIsDone);
  const [todoTitle, setTodoTitle] = useState(tdoTitle);
  const [changeTitle, setChangeTitle] = useState(true);

  //states directly used in return value
  const {categories, priorities} = useSelector((state)=> state.generalState);

  //Mutations
  const [updateIsCheckedTodo] = useUpdateIsCheckedTodoMutation();
  const [updateTitleTodo] = useUpdateTitleTodoMutation();
  const [removeTodo] = useRemoveOneTodoMutation();

  //Update todo isChecked als gebruiker checkbox aanklikt
  useEffect(()=>{updateIsCheckedTodo({id,tdoChecked: isChecked})},[isChecked]);

  //Update de titel, api call wordt pas gedaan als de gebruiker de wijziging bevestigd
  function handleTitlechangeClick(e){
    e.preventDefault()
    updateTitleTodo({id, todoTitle})
    setChangeTitle(!changeTitle)
  }
  
  return (
    <>
      <div className="todo">
       <form className="todo__front">
         {categories && categories.length > 0 && categories.filter(({id} )=> id === tdoCty.id).map(category => <p>Category: {category.ctyTitle}</p>)}
         {priorities && priorities.length > 0 && priorities.filter(({id} )=> id === tdoPty.id).map(priority => <p>Priority: {priority.ptyTitle}</p>)}
       <input type="checkbox" className="todo__front__checked" checked={tdoIsDone ? "checked" : ""} onChange={() =>setIsChecked(!isChecked)}/> 
      <input type="text" className={tdoIsDone ? "todo__front__title checked" : "todo__front__title"}
          onInput={(e) => setTodoTitle(e.target.value)} value={todoTitle} disabled={changeTitle}/>

          {!changeTitle && <button onClick={handleTitlechangeClick}>Confirm todo change</button>}
       </form>
        <div className="todo_actions">
      <button onClick={() => setChangeTitle(!changeTitle)}>Edit todo</button>
      <button onClick={() =>removeTodo(id)}>Delete todo</button>
        </div>
      </div>
    </>
  );
};

export default todo;
