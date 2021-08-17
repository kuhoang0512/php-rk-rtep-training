import React from "react";

const TodoItem = ({ title, description, handleDelete, editTodo }) => {
  return (
    <li className="list-group-item d-flex text-capitalize justify-content-between my-2">
      <div className="d-flex">
        <b style={{ marginRight: "100px" }}>{title}</b>
        <h6>{description}</h6>
      </div>
      <div className="todo-icons">
        <span className="mx-2 text-success" onClick={editTodo}>
          Edit
        </span>
        <span className="mx-2 text-danger" onClick={handleDelete}>
          Delete
        </span>
      </div>
    </li>
  );
};

export default TodoItem;