import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [userTodo, setUserToDo] = useState("");

  const fetchTodos = () => {
    fetch("/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const handleChange = (e) => {
    setUserToDo(e.target.value);
  };

  const handleClick = () => {
    fetch("/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ description: userTodo }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data[0], ...todos));
  };

  useEffect(fetchTodos, []);

  return (
    <div className='App'>
      <input type='text' value={userTodo} onChange={handleChange} />
      <button onClick={handleClick}>Add To Do!</button>
      <ul>
        {todos.map((todo) => (
          <li>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
