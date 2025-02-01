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
      state.todos = [...state.todos, { id: Date.now(), title: state.text }];
      state.text = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAsyncTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
  },
});

export const { changeText, addTodo} = todoSlice.actions;
export default todoSlice.reducer;
