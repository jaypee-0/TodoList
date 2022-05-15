import './App.scss';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

function App() {
  const [todos, settodos] = useState({
    id: "",
    task: "", 
    completed: false
  })
  const [TODO, setTODO] = useState([])
  const [active, setactive] = useState()
  const [completed, setcompleted] = useState("")
  const [showinput, setshowinput] = useState(true)

  const addTodos =(todos) => {
    setTODO([todos, ...TODO]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(todos.task.trim()) {
      addTodos({ ...todos, id: uuidv4() });
      settodos({ ...todos, task: ""});
    }
  }
  const handleComplete = ({id}) => {
    setshowinput(false)
    setTODO(setactive)
    
  }
  const handleAll = () => {
    setshowinput(true)
    setTODO(setactive)
  }
  const handleActive = () => {
    setshowinput(true)

  }  
  const handleCheckbox = (todo) => {
    setTODO(
      TODO.map((todos) => {
        if (todos.id === todo.id) {
          return {...todos, completed: !todos.completed};
        }
        return todos;
      })
    )
  }
  const handleRemove = ({ id }) => {
    setTODO(TODO.filter((todo) => todo.id !== id));
  }

  const LOCAL_KEY = "todo-list";
  //todos on initial render  
  useEffect(() => {
    const storetodo = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (storetodo) {
      setTODO(storetodo);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(TODO));
  }, [TODO])
  
  return (
    <div id='App' className="container">
      <header className="fs-2 fw-bold mt-5 mb-4 text-center m-auto mr-5">
       Todo
      </header>
      <div className='w-75 m-auto'>
        <ul className='select pl-0 d-flex flex-row justify-content-between col-10 m-auto mb-0'>
          <li onClick={handleAll}>All</li>
          <li onClick={handleActive}>Active</li>
          <li onClick={handleComplete}>Completed</li>
        </ul>
        <hr className='mt-0' />
        {showinput && 
        <form className="d-flex mb-2 w-100"
        onSubmit={handleSubmit}>          
        <input 
        className="w-100 py-2 px-3 mr-2" 
        value={todos.task}
        onChange={(e) => {
          settodos({...todos, task: e.target.value})
        }}
        type="text" 
        placeholder='Enter todo' />
        <button
        className='py-2 px-4 add'>Add</button>
      </form>
        }  
        {/* Todolists */} 
        <div className='d-flex flex-column'>       
          {TODO.map(todo => {
            return (
              <ul className='list d-flex flex-row mb-3 pl-0 align-items-center justify-content-between' key={todo.id}>
                <input type="checkbox" onClick={() => handleCheckbox(todo)} className='mr-3'/>
                <li className={todo.completed ? 'text-decoration-line-through mr-auto' : 'mr-auto'}>{todo.task}</li>
                <button type='submit' onClick={() => handleRemove(todo)} className='del py-0'><FA icon="fa-trash-can" beatFade="true" /></button>
              </ul>
            )
          })}
          </div>
      </div>
    </div>
  );
}

export default App;
