import React from "react";
import {useState, useEffect} from "react";
import { useUpdateIsCheckedTodoMutation, useUpdateTitleTodoMutation,
  useRemoveOneTodoMutation, useUpdateCategoryTodoMutation, useUpdatePriorityTodoMutation } from "../../data/todoApi";
import { useSelector } from "react-redux";
import {pickFromSelection, switchNextSelection } from "../../helpers/selectionpicker";
import {parseCookies} from "nookies";

const todo = ({todo: {id, tdoTitle, tdoIsDone, tdoPty, tdoCty},activeId}) => {
  const {jwt_token_TDL: token} = parseCookies();
  //Usestates / getstates
  const [isChecked, setIsChecked] = useState(tdoIsDone);
  const [todoTitle, setTodoTitle] = useState(tdoTitle);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedPriority, setSelectedPriority] = useState({});

  //states directly used in return value
  const {categories, priorities} = useSelector((state)=> state.persistedReducer.generalState);


  //Mutations
  const [updateIsCheckedTodo] = useUpdateIsCheckedTodoMutation();
  const [updateTitleTodo] = useUpdateTitleTodoMutation();
  const [removeTodo] = useRemoveOneTodoMutation();
  const [updateCategory] = useUpdateCategoryTodoMutation();
  const [updatePriority] = useUpdatePriorityTodoMutation();

  //Update todo isChecked als gebruiker checkbox aanklikt
  useEffect(()=>{updateIsCheckedTodo({id,tdoChecked: isChecked, token})},[isChecked]);

useEffect(()=>{
  if(categories.length > 0 && tdoCty && "id" in tdoCty)
{
const newCategory = pickFromSelection(categories, tdoCty, "categories");

setSelectedCategory(newCategory);
}},[categories])

useEffect(()=>{if(priorities.length > 0 && tdoPty && "id" in tdoPty)
{
  const newPriority = pickFromSelection(priorities, tdoPty, "priorities");
  setSelectedPriority(newPriority);
}},[priorities])

  //Update de titel
  function handleTitlechangeClick(e){
    e.preventDefault()
    updateTitleTodo({id, todoTitle, token})
  }
  
  function handleCategoryswitchClick(e)
  {
      e.preventDefault();
      const categoryToSet = switchNextSelection(categories, selectedCategory, "categories");
      setSelectedCategory(categoryToSet);
      if(categoryToSet != null){
      updateCategory({id, catId: categoryToSet.id, token});}
  }

  //Handle priority change
  function handlePriorityswitchClick()
  {
    const priorityToSet = switchNextSelection(priorities, selectedPriority, "categories");
    setSelectedPriority(priorityToSet);
    if(priorityToSet != null){
    updatePriority({id, ptyId: priorityToSet.id, token})
  }
    
  }

  return (
    <>
      <div className={selectedCategory && selectedCategory["ctyClass"] != null ?`todo ${selectedCategory.ctyClass}` : `todo standard`}>
       
         <div className="todo__buttongroup">

         </div>
         <form className="todo__front" onSubmit={handleTitlechangeClick} id={`formtodo-${id}`}>
      <label className="todo__front__label">Checked 
      <input type="checkbox" className="todo__front__label__checker form-check-input" checked={tdoIsDone ? "checked" : ""} onChange={() =>setIsChecked(!isChecked)}/> </label>
      <input type="text"  className={tdoIsDone ? "todo__front__title checked" : "todo__front__title"}
          onInput={(e) => setTodoTitle(e.target.value)} value={todoTitle}/>
      
      <button className="todo__front__button btn btn-outline-secondary" type="submit">Update title </button>
      <button className="todo__front__button btn btn-outline-secondary" onClick={() =>removeTodo({id, token})}>Delete todo</button>
        {selectedCategory && selectedCategory["ctyTitle"] && <button onClick={handleCategoryswitchClick} className="todo__front__button btn btn-outline-secondary">Category: {selectedCategory.ctyTitle}</button>}
        {selectedCategory && !selectedCategory["ctyTitle"] && <button onClick={handleCategoryswitchClick} className="todo__front__button btn btn-outline-secondary">Category: default</button>}
        {!selectedCategory && <button onClick={handleCategoryswitchClick} className="todo__front__button btn btn-outline-secondary">Category: default</button>}
         {selectedPriority  && "ptyTitle" in selectedPriority && <button onClick={handlePriorityswitchClick} className="todo__front__button  btn btn-outline-secondary">Priority: {selectedPriority.ptyTitle}</button>}
         {selectedPriority  &&  !selectedPriority["ptyTitle"] && <button onClick={handlePriorityswitchClick} className="todo__front__button  btn btn-outline-secondary">Priority: default</button>}
       </form>
      </div>
    </>
  );
};

export default todo;