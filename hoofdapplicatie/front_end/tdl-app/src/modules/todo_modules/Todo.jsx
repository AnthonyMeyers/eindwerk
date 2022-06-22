import React from "react";
import { useState, useEffect } from "react";
import {
  useUpdateIsCheckedTodoMutation,
  useUpdateTitleTodoMutation,
  useRemoveOneTodoMutation,
  useUpdateCategoryTodoMutation,
  useUpdatePriorityTodoMutation,
} from "../../data/todoApi";
import { useSelector } from "react-redux";
import {
  pickFromSelection,
  switchNextSelection,
} from "../../helpers/selectionpicker";
import { parseCookies } from "nookies";
import { errorhandlingtodos } from "../../helpers/errorhandling";
import Errormessage from "../extra_modules/Errormessage";

const todo = ({
  todo: { id, tdoTitle, tdoIsdone, tdoPty, tdoCty },
  activeId,
}) => {
  const { jwt_token_TDL: token } = parseCookies();
  //Usestates / getstates
  const [isChecked, setIsChecked] = useState(tdoIsdone);
  const [todoTitle, setTodoTitle] = useState(tdoTitle);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedPriority, setSelectedPriority] = useState({});

  //states directly used in return value
  const { categories, priorities } = useSelector(
    (state) => state.persistedReducer.generalState
  );

  //Mutations
  const [updateIsCheckedTodo] = useUpdateIsCheckedTodoMutation();
  const [updateTitleTodo] = useUpdateTitleTodoMutation();
  const [removeTodo] = useRemoveOneTodoMutation();
  const [updateCategory] = useUpdateCategoryTodoMutation();
  const [updatePriority] = useUpdatePriorityTodoMutation();
  const [errorTitle, setErrorTitle] = useState(null);

  //Update todo isChecked als gebruiker checkbox aanklikt
  useEffect(() => {
    updateIsCheckedTodo({ id, tdoChecked: isChecked, token });
  }, [isChecked]);

  useEffect(() => {
    if (categories.length > 0 && tdoCty && "id" in tdoCty) {
      const newCategory = pickFromSelection(categories, tdoCty, "categories");

      setSelectedCategory(newCategory);
    }
  }, [categories]);

  useEffect(() => {
    if (priorities.length > 0 && tdoPty && "id" in tdoPty) {
      const newPriority = pickFromSelection(priorities, tdoPty, "priorities");
      setSelectedPriority(newPriority);
    }
  }, [priorities]);

  //Update de titel
  function handleTitlechangeClick(e) {
    e.preventDefault();
    const errortodo = errorhandlingtodos("todo-title", todoTitle);
    setErrorTitle(errortodo);
    if (!errortodo) {
      const statusAddTitle = updateTitleTodo({ id, todoTitle, token });
      statusAddTitle.then((response) => {
        if ("error" in response) {
          setErrorTitle(
            response?.error?.data?.violations[0]?.message ||
              "An error has occured"
          );
        }
      });
    }
  }

  function handleCategoryswitchClick(e) {
    setErrorTitle(null);
    const categoryToSet = switchNextSelection(
      categories,
      selectedCategory,
      "categories"
    );
    setSelectedCategory(categoryToSet);
    if (categoryToSet != null) {
      updateCategory({ id, catId: categoryToSet.id, token });
    }
  }

  //Handle priority change
  function handlePriorityswitchClick() {
    setErrorTitle(null);
    const priorityToSet = switchNextSelection(
      priorities,
      selectedPriority,
      "categories"
    );
    setSelectedPriority(priorityToSet);
    if (priorityToSet != null) {
      updatePriority({ id, ptyId: priorityToSet.id, token });
    }
  }

  return (
    <>
      <div
        className={
          selectedCategory && selectedCategory["ctyClass"] != null
            ? `todo ${selectedCategory.ctyClass}`
            : `todo standard`
        }
      >
        <form
          className="todo__front"
          onSubmit={handleTitlechangeClick}
          id={`formtodo-${id}`}
        >
          <div className="todo__front__display todo__front__left">
            <label className="todo__front__left__label">
              <span className="todo__front__left__label__span">Checked </span>
              <input
                type="checkbox"
                spellCheck="false"
                className="todo__front__left__label__checker"
                checked={tdoIsdone ? "checked" : ""}
                onChange={() => setIsChecked(!isChecked)}
              />
            </label>
            <input
              maxLength="22"
              spellCheck="false"
              className={
                tdoIsdone
                  ? "todo__front__left__title checked"
                  : "todo__front__left__title"
              }
              onInput={(e) => setTodoTitle(e.target.value)}
              value={todoTitle}
            />
          </div>
          <div className="todo__front__display todo__front__right">
            <button
              className="todo__front__right__button todo__front__right__button-confirm btn btn-outline-secondary"
              type="submit"
            >
              <span className="todo__front__right__button__innertext">
                Update title{" "}
              </span>
            </button>
            <button
              type="button"
              className="todo__front__right__button todo__front__right__button-delete btn btn-outline-secondary"
              onClick={() => removeTodo({ id, token })}
            >
              <span className="todo__front__right__button__innertext">
                Delete todo
              </span>
            </button>
            {selectedCategory && selectedCategory["ctyTitle"] && (
              <button
                type="button"
                onClick={handleCategoryswitchClick}
                className="todo__front__right__button btn btn-outline-secondary"
              >
                {selectedCategory.ctyTitle}
              </button>
            )}
            {selectedCategory && !selectedCategory["ctyTitle"] && (
              <button
                type="button"
                onClick={handleCategoryswitchClick}
                className="todo__front__right__button btn btn-outline-secondary"
              >
                default
              </button>
            )}
            {!selectedCategory && (
              <button
                onClick={handleCategoryswitchClick}
                className="todo__front__right__button btn btn-outline-secondary"
              >
                default
              </button>
            )}
            {selectedPriority && "ptyTitle" in selectedPriority && (
              <button
                type="button"
                onClick={handlePriorityswitchClick}
                className="todo__front__right__button  btn btn-outline-secondary"
              >
                Priority: {selectedPriority.ptyTitle}
              </button>
            )}
            {selectedPriority && !selectedPriority["ptyTitle"] && (
              <button
                type="button"
                onClick={handlePriorityswitchClick}
                className="todo__front__right__button  btn btn-outline-secondary"
              >
                Priority: default
              </button>
            )}
          </div>
        </form>
        <Errormessage className="error-center">{errorTitle}</Errormessage>
      </div>
    </>
  );
};

export default todo;
