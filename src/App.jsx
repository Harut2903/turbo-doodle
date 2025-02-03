import { useDispatch, useSelector } from 'react-redux'
import { getAsyncTodo } from './slices/todoSlice'
import './App.css'
import { useEffect } from 'react'
import Todo from './components/Todos/Todo'
import { MyContext } from './context';


function App() {
 
  const {text, todos, loading} = useSelector((state) => state.todoReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAsyncTodo(5))
  }, [])

  const value =  {
    text,
    todos,
    loading,
    dispatch
  }

  return (
    <div className='App'>
       <MyContext.Provider value={value}>
        <Todo />
        </MyContext.Provider>
    </div>
  )
}

export default App
