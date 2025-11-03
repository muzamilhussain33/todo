import React, { useEffect, useRef, useState, useMemo } from 'react' // Import useMemo
import todo_icon from '../assets/todo-list.png'
import Todoitems from './Todoitems'

// Helper function to safely load from localStorage
const loadTodos = () => {
  const STORAGE_KEY = "todos";
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Failed to parse todos from localStorage:", error);
    return []; // Return empty array on error
  }
};

const Todo = () => {
    // Use the safe loader function and camelCase for variable name
    const [todoList, setTodoList] = useState(loadTodos());
    const [filter, setFilter] = useState('all'); // *** NEW: State for filtering
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === '') {
            return null;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            iscomplete: false
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    // New function to handle 'Enter' key press
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            add();
        }
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => (todo.id !== id))
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, iscomplete: !todo.iscomplete }
                }
                return todo;
            })
        })
    }

    // Function to edit the text of a todo item
    const editTodo = (id, newText) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, text: newText } // Update the text
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]) // Dependency is now the camelCase 'todoList'


    // *** NEW: Filter logic ***
    // We use useMemo to avoid re-calculating this on every render
    const filteredTodos = useMemo(() => {
      if (filter === 'active') {
        return todoList.filter(todo => !todo.iscomplete);
      }
      if (filter === 'completed') {
        return todoList.filter(todo => todo.iscomplete);
      }
      return todoList; // 'all'
    }, [todoList, filter]); // Re-run only if todoList or filter changes


    // *** NEW: Helper function for button styling ***
    const getButtonClass = (buttonFilter) => {
      return `px-4 py-1 rounded-md text-sm font-medium transition-colors ${
        filter === buttonFilter
          ? 'bg-red-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`;
    };


    return (
        <div className='bg-white w-10/12 sm:w-11/12 max-w-6xl flex flex-col sm:p-7 p-3 min-h-[550px] rounded-xl '>
            {/*---------Title-------------*/}
            {/* *** UPDATED: Title section with filter buttons *** */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-7 gap-4 sm:gap-2'>
                {/* Left Side: Title */}
                <div className='flex items-center gap-2'>
                    <img className='w-8' src={todo_icon} alt="Todo List Icon" />
                    <h1 className='text-3xl font-semibold'>To-Do List</h1>
                </div>

                {/* Right Side: Filter Buttons */}
                <div className='flex gap-2'>
                    <button
                      onClick={() => setFilter('all')}
                      className={getButtonClass('all')}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('active')}
                      className={getButtonClass('active')}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setFilter('completed')}
                      className={getButtonClass('completed')}
                    >
                      Completed
                    </button>
                </div>
            </div>

            {/*-----------input box-------------*/}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    onKeyDown={handleKeyDown} // Added keydown listener
                    className='bg-transparent w-11/12 border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder='Add your task'
                />
                <button onClick={add} className='border-none rounded-full bg-red-600 w-20 sm:w-32 h-14 text-white text-ld font-medium cursor-pointer active:scale-90'>ADD +</button>
            </div>

            {/*-----------To do items-------------*/}
            <div>
                {/* *** UPDATED: Map over filteredTodos instead of todoList *** */}
                {filteredTodos.map((item) => {
                    return <Todoitems
                        key={item.id}
                        text={item.text}
                        id={item.id}
                        iscomplete={item.iscomplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                        editTodo={editTodo} // Pass the new function as a prop
                    />
                })}
            </div>
        </div>
    )
}

export default Todo