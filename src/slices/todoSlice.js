import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncTodo = createAsyncThunk(
  "getAsyncTodo",
  async (limit, { dispatch }) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    return res.data;
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    text: "",
    todos: [],
    loading: false,
  },
  reducers: {
    changeText(state, action) {
      state.text = action.payload;
    },
    addTodo(state) {
      if (state.text.trim()) {
        state.todos = [...state.todos, { id: Date.now(), title: state.text }];
        state.text = "";
      }
    },
    editTodo(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAsyncTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload.map(todo => ({
        ...todo,
        completed: false
      }));
    });
  },
});

export const { changeText, addTodo, editTodo, deleteTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
