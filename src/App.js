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
    const filteredTodo = tempTodos.find((todo) => todo.id === id);
    filteredTodo.isCompleted = !filteredTodo.isCompleted;

    setTodos(tempTodos);
  }

  function handleClear() {
    const clear = window.confirm("Are you sure to clear this list?");
    if (clear) setTodos([]);
  }

  function handleRemove(id) {
    // exclude todo with the same id so the new todolist only contain unremoved todos
    const tempTodos = todos.filter((todo) => todo.id !== id);
    setTodos(tempTodos);
  }

  return (
    <div className="min-vh-100 min-vw-100 bg-dark d-flex justify-content-center align-items-center">
      <div
        className="container m-5 shadow-lg row card"
        style={{
          backgroundColor: "rgba(50,50,50,0.5)",
        }}
      >
        <div className="my-3 text-light card-header">
          <h3>Todo Apps</h3>
        </div>

        <div className="card-body row">
          <div className="col-12 col-md-6 row">
            <div className="col-12 col-md-8">
              <input
                ref={todoNameRef}
                type="text"
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="gap-2 mt-3 col-md-4 col-12 d-flex mt-md-0 justify-content-end">
              <button onClick={handleAdd} className="btn btn-primary">
                Add
              </button>
              <button className="btn btn-danger" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 card-body row">
          <div className="col-12 col-md-6">
            <div>
              <h5 className="pb-2 text-white border-bottom border-light">
                {" "}
                {todos.filter((todo) => !todo.isCompleted).length} Task Left
              </h5>
              <TodoList
                todoList={todos.filter((todo) => !todo.isCompleted)}
                toggleCompleted={toggleCompleted}
                handleRemove={handleRemove}
              />
            </div>
          </div>

          <div className="mt-3 mt-md-0 col-12 col-md-6">
            <div>
              <h5 className="pb-2 text-white border-bottom border-primary">
                {" "}
                {todos.filter((todo) => todo.isCompleted).length} Task Done
              </h5>
              <TodoList
                todoList={todos.filter((todo) => todo.isCompleted)}
                toggleCompleted={toggleCompleted}
                handleRemove={handleRemove}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
