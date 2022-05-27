import React from "react";
import Todo from "./todo";

const Todo_list = () => {
  const hasTodos = true;
  const todos = [
    { title: "Do the dishes" },
    { title: "Cut the lawn" },
    { title: "Clear the table" },
    { title: "Be creative" },
    { title: "Painting stars" },
  ];

  return (
    <>
      <h2 className="container__title">Active todos:</h2>
      {hasTodos && (
        <ul className="todolist">
          {todos.length > 0 &&
            todos.map(({ title }, i) => (
              <li key={i} className="todolist__item">
                <Todo todoTitle={title} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default Todo_list;
