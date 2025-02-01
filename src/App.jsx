import { useDispatch, useSelector } from 'react-redux'
import { changeText, addTodo, getAsyncTodo } from './slices/todoSlice'
import './App.css'
import { useEffect } from 'react'


function App() {
 
  const {text, todos, loading} = useSelector((state) => state.todoReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAsyncTodo(8))
  }, [])

  return (
    <div className='App'>
        <input value={text} onChange={(e) => dispatch(changeText(e.target.value))}/>
        <button onClick={() => dispatch(addTodo())}>+</button>


        {
          loading 
          ?
          <h1>Loading...</h1>
          :
          todos.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>
          })
        }
    </div>
  )
}

export default App
