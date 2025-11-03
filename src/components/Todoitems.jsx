import React from 'react'
import Tick from '../assets/tick.svg'
import Untick from '../assets/un_tick.png'
import Delete from '../assets/delete.svg'

function Todoitems({ text, id, iscomplete, deleteTodo, toggle }) {
  return (
    <div className='flex items-center my-3 w-full gap-2 p-3 rounded-lg'>

      {/* FIX 1: Added 'min-w-0' to allow this flex container to shrink */}
      <div
        onClick={() => { toggle(id) }}
        className='flex flex-1 items-center cursor-pointer min-w-0'
        role="button"
        tabIndex="0"
      >
        <img src={iscomplete ? Tick : Untick} className='w-7' alt={iscomplete ? "Completed" : "Mark as complete"} />
        
        {/* FIX 2: Changed 'break-words' to 'break-all' to wrap long strings */}
        <p className={`text-red-700 break-all ml-4 text-[18px] ${iscomplete ? "line-through" : ""}`}>
          {text}
        </p>
      </div>

      {/* Added 'flex-shrink-0' to ensure delete icon never gets squished */}
      <img
        onClick={() => { deleteTodo(id) }}
        src={Delete}
        className='w-6 cursor-pointer flex-shrink-0 ml-12'
        alt="Delete todo"
        role="button"
        tabIndex="0"
      />

    </div>
  )
}

export default Todoitems