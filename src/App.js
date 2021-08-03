import React from "react";
import TodoList from "./TodoList";

function App() {
  const todoNameRef = React.useRef();
  const LOCAL_STORAGE_KEY = "todoApp.todos";
  const [todos, setTodos] = React.useState([]);

  function handleAdd(e) {
    const name = todoNameRef.current.value;
    setTodos((td) => [
      ...td,
      {
        id: new Date().getTime(),
        name: name,
        isCompleted: false,
      },
    ]);
    todoNameRef.current.value = null;
  }

  React.useEffect(() => {
    const loadedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (loadedTodos) {
      setTodos(loadedTodos);
    } else {
      alert("Empty data!!");
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleCompleted(id) {
    const tempTodos = [...todos];
    const toggledTodo = tempTodos.find((todo) => todo.id === id);
    toggledTodo.isCompleted = !toggledTodo.isCompleted;

    setTodos(tempTodos);
  }

  function handleClear() {
    const tempTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(tempTodos);
  }

  function handleRemove(id) {
    // exclude todo with the same id so the new todolist only contain unremoved todos
    const tempTodos = todos.filter((todo) => todo.id !== id);
    setTodos(tempTodos);
  }

  return (
    <div className="min-vh-100 min-vw-100 bg-dark d-flex justify-content-center align-items-center">
      <div className="container m-5 row">
        <div className="col-3">
          <input ref={todoNameRef} type="text" className="form-control" />
        </div>
        <div className="gap-2 col-3 d-flex">
          <button onClick={handleAdd} className="btn btn-primary">
            Add
          </button>
          <button className="btn btn-success" onClick={handleClear}>
            Clear Done
          </button>
        </div>
        <div className="col-12">
          <h5 className="mt-5 text-white">
            {" "}
            {todos.filter((todo) => !todo.isCompleted).length} Task Left
          </h5>
          <TodoList
            todoList={todos}
            toggleCompleted={toggleCompleted}
            handleRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
