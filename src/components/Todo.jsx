import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo-list.png'
import Todoitems from './Todoitems'

const Todo = () => {

    const [Todolist, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);

    const inputRef = useRef();
    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText==='') {
            return null;
        }
        const newTodo = {
            id : Date.now(),
            text : inputText,
            iscomplete : false
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value="";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => (todo.id !== id))
        })
    }

    const toggle = (id) =>  {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id === id){
                    return {...todo, iscomplete: !todo.iscomplete}
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(Todolist));
    },[Todolist])

    return (
        <div className='bg-white place-self-center w-10/12 sm:w-11/12 max-w-md flex flex-col p-7  min-h-[550px] rounded-xl'>
            {/*---------Title-------------*/}

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="Todo List" />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/*-----------input box-------------*/}
            <div className='flex items-center my-7 bg-gray-200  rounded-full'>
                <input ref={inputRef} className='bg-transparent w-11/12 border-0 outline-none flex-1  h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' name="" id="" />
                <button onClick={add} className='border-none rounded-full bg-red-600 w-20 sm:w-32 h-14 text-white text-ld font-medium cursor-pointer'>ADD +</button>
            </div>

            {/*-----------To do items-------------*/}
            <div>
                {Todolist.map((item, index) => {
                    return<Todoitems key={index} text={item.text} id={item.id} iscomplete={item.iscomplete} deleteTodo={deleteTodo} toggle={toggle}/>
                })}
            </div>


        </div>
    )
}

export default Todo
