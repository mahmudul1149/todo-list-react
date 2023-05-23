import axios from "axios";
import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bodyInput, setBodyInput] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);
  const handleInputChange = (e) => {
    e.preventDefault();
  };

  const handleAddItem = () => {
    const newTodoItem = {
      id: todos.length + 1,
      title: title,
      body: bodyInput,
      userId: 1,
      completed: false,
    };

    setTodos((prevTodos) => [newTodoItem, ...prevTodos]);
    setBodyInput("");
    setTitle("");
  };
  const deleteTodo = (id) => {
    setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== id));
  };

  return (
    <div class="container mx-auto ">
      <form onSubmit={handleInputChange} className="my-5">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mb-2"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mb-2"
          placeholder="Enter body"
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </form>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul className="grid  gap-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-lime-300 shadow-blue-500/50    rounded-lg shadow-md p-4"
            >
              <div className="flex items-center	 justify-between">
                <div>
                  <h2 className="text-lg text-black font-bold">{todo.title}</h2>
                  <h2 className="text-lg font-400">{todo.body}</h2>
                </div>
                <div className="btn">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2  px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
