import React from "react";
import {useState, useEffect} from "react";
import { useUpdateIsCheckedTodoMutation, useUpdateTitleTodoMutation,
  useRemoveOneTodoMutation, useUpdateCategoryTodoMutation, useUpdatePriorityTodoMutation } from "../../data/todoApi";
import { useSelector } from "react-redux";

const todo = ({todo: {id, tdoTitle, tdoIsDone, tdoPty, tdoCty},activeId}) => {
  //Usestates / getstates
  const [isChecked, setIsChecked] = useState(tdoIsDone);
  const [todoTitle, setTodoTitle] = useState(tdoTitle);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedPriority, setSelectedPriority] = useState({});

  //states directly used in return value
  const {categories, priorities} = useSelector((state)=> state.generalState);


  //Mutations
  const [updateIsCheckedTodo] = useUpdateIsCheckedTodoMutation();
  const [updateTitleTodo] = useUpdateTitleTodoMutation();
  const [removeTodo] = useRemoveOneTodoMutation();
  const [updateCategory] = useUpdateCategoryTodoMutation();
  const [updatePriority] = useUpdatePriorityTodoMutation();

  //Update todo isChecked als gebruiker checkbox aanklikt
  useEffect(()=>{updateIsCheckedTodo({id,tdoChecked: isChecked})},[isChecked]);
  useEffect(()=>{updateCategory({id, catId: selectedCategory.id})},[selectedCategory])
  useEffect(()=>{updatePriority({id, ptyId: selectedPriority.id})},[selectedPriority])


useEffect(()=>{
if(categories.length > 0 && tdoCty && "id" in tdoCty)
{
const selectCategory = categories.reduce((selected, value)=> {if(tdoCty.id === value.id)
{
  return value;
} else return selected;
},0
)
setSelectedCategory(selectCategory);
}

if(priorities.length > 0 && tdoPty && "id" in tdoPty)
{

const selectPriority = priorities.reduce((selected, value)=> {if(tdoPty.id === value.id)
{
  return value;
} else return selected;
},0
)
setSelectedPriority(selectPriority);
}
},[categories,priorities])

  //Update de titel
  function handleTitlechangeClick(e){
    e.preventDefault()
    updateTitleTodo({id, todoTitle})
  }
  
  function handleCategoryswitchClick(e)
  {
    e.preventDefault();
    const maxId = categories[categories.length-1].id;

    if(selectedCategory.id < maxId)
    {
      const selectCat = categories.reduce((selected, value)=> {
        let truth = true;
        if(selectedCategory.id + 1 == value.id && truth)
        {
          truth = false;
          return value;
        } else return selected;
        },0)
      setSelectedCategory(selectCat)
    }else setSelectedCategory(categories[0]);
  }

  //Handle priority change
  function handlePriorityswitchClick()
  {
    const maxId = priorities[priorities.length-1].id;

    if(selectedPriority.id < maxId)
    {
      const selectPty = priorities.reduce((selected, value)=> {
        let truth = true;
        if(selectedPriority.id + 1 == value.id && truth)
        {
          truth = false;
          return value;
        } else return selected;
        },0)
      setSelectedPriority(selectPty)
    }else setSelectedPriority(priorities[0]);
    
  }

  return (
    <>
      <div className={`todo ${selectedCategory.ctyClass}`}>
       
         <div className="todo__buttongroup">

         </div>
         <form className="todo__front" onSubmit={handleTitlechangeClick} id={`formtodo-${id}`}>
      <label className="todo__front__label">Checked 
      <input type="checkbox" className="todo__front__label__checker form-check-input" checked={tdoIsDone ? "checked" : ""} onChange={() =>setIsChecked(!isChecked)}/> </label>
      <input type="text"  className={tdoIsDone ? "todo__front__title checked" : "todo__front__title"}
          onInput={(e) => setTodoTitle(e.target.value)} value={todoTitle}/>
      
      <button className="todo__front__button btn btn-outline-secondary" type="submit">Update title </button>
      <button className="todo__front__button btn btn-outline-secondary" onClick={() =>removeTodo(id)}>Delete todo</button>
        {selectedCategory && "ctyTitle" in selectedCategory && <button onClick={handleCategoryswitchClick} className="todo__front__button btn btn-outline-secondary">Category: {selectedCategory.ctyTitle}</button>}
         {selectedPriority  && "ptyTitle" in selectedPriority && <button onClick={handlePriorityswitchClick} className="todo__front__button  btn btn-outline-secondary">Priority: {selectedPriority.ptyTitle}</button>}
       </form>
      </div>
    </>
  );
};

export default todo;
