import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const [todo, setTodo] = useState("");
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (token) {
      const getTodos = async () => {
        const response = await fetch("https://full-stack-todo-application-dchp.onrender.com/api/read-todos", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTodos(data.todos);
      };

      getTodos();
    }
  }, [token, todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://full-stack-todo-application-dchp.onrender.com/api/create-todo", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        console.error("Error creating todo:", response.status);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }

    setTodo("");
  };

  const handleEdit = async (todoId) => {
    const updatedTodo = prompt("Update your todo");

    const response = await fetch(
      `https://full-stack-todo-application-dchp.onrender.com/${todoId}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedTodo }),
      }
    );

    const data = await response.json();
    alert(data.message);
  };

  const handleDelete = async (todoId) => {
    const response = await fetch(
      `https://full-stack-todo-application-dchp.onrender.com/${todoId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    alert(data.message);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <section className="todo-container">
      <div className="top-bar">
        {token ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="login-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        )}
      </div>

      {token && (
        <>
          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>

          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <span className="text">{todo.todo}</span>
                <div className="icons">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(todo._id)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(todo._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
