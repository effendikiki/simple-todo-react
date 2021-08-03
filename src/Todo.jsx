import React from "react";

export default function Todo(props) {
  function handleToggle() {
    props.toggleCompleted(props.task.id);
  }

  function handleRemove() {
    props.handleRemove(props.task.id);
  }

  return (
    <div className="d-flex align-items-center">
      <label>
        <input
          type="checkbox"
          checked={props.task.isCompleted}
          onChange={handleToggle}
        />{" "}
        {props.task.name}
      </label>
      <div>
        <button className="btn" onClick={handleRemove}>
          <i className="bi bi-x-lg text-danger"></i>
        </button>
        <button className="btn" onClick={handleRemove}>
          <i className="bi bi-check-lg text-success"></i>
        </button>
      </div>
    </div>
  );
}
