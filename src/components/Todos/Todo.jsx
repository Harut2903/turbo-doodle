import React, { useContext, useState } from "react";
import "./Todos.css";
import {
  changeText,
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
} from "../../slices/todoSlice";
import { MyContext } from "../../context";

const Todo = () => {
  const { text, todos, loading, dispatch } = useContext(MyContext);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const toggleEdit = (id, title) => {
    setEditingId(id);
    setEditedText(title);
  };

  const saveEdit = (id) => {
    if (editedText.trim()) {
      dispatch(editTodo({ id, title: editedText }));
    }
    setEditingId(null);
  };

  return (
    <div className="todo-container">
      <input
        className="todo-input"
        value={text}
        onChange={(e) => dispatch(changeText(e.target.value))}
      />
      <button className="todo-button" onClick={() => dispatch(addTodo())}>
        +
      </button>

      {loading ? (
        <h1 className="loading-text">Loading...</h1>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed || false}
                onChange={() => dispatch(toggleComplete(todo.id))}
              />

              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <span onDoubleClick={() => toggleEdit(todo.id, todo.title)}>
                  {todo.title}
                </span>
              )}

              {editingId === todo.id ? (
                <button onClick={() => saveEdit(todo.id)}>✔</button>
              ) : (
                <button onClick={() => toggleEdit(todo.id, todo.title)}>
                  ✏
                </button>
              )}

              <button onClick={() => dispatch(deleteTodo(todo.id))}>🗑</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
