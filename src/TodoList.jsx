import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, toggleCompleted, handleRemove }) {
  return (
    <div className="mt-5 text-light">
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          task={todo}
          toggleCompleted={toggleCompleted}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
}

TodoList.defaultProps = {
  todoList: [{ id: 1, name: "test", isCompleted: false }],
};

// export default TodoList;
