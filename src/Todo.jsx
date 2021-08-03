import React from "react";

export default function Todo(props) {
  function handleToggle() {
    props.toggleCompleted(props.task.id);
  }

  function handleRemove() {
    props.handleRemove(props.task.id);
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: "rgba(55,55,55,1)",
      }}
    >
      <div className="card-body bg-dark d-flex align-items-center justify-content-between">
        <div>{props.task.name}</div>
        <div>
          <button className="btn" onClick={handleRemove}>
            <i className="bi bi-x-lg text-danger"></i>
          </button>

          <button className="btn" onClick={handleToggle}>
            {/* <i className="bi bi-arrow-counterclockwise text-warning"></i> */}
            <i
              className={
                "bi " +
                (props.task.isCompleted
                  ? "bi-arrow-counterclockwise text-warning"
                  : "bi-check-lg text-success")
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
