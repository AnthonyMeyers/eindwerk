import React from "react";

const todo = ({ todoTitle }) => {
  return (
    <>
      <div className="todo">
        <h3 className="todo_title">{todoTitle}</h3>
      </div>
    </>
  );
};

export default todo;
