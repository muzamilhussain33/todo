import React, { useState } from 'react'
import Tick from '../assets/tick.svg'
import Untick from '../assets/un_tick.png'
import Delete from '../assets/delete.svg'

function Todoitems({ text, id, iscomplete, deleteTodo, toggle, editTodo }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim() === '') {
        return;
    }
    editTodo(id, editText.trim());
    setIsEditing(false); 
  }

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  }

  return (
    <div className='flex items-center my-3 w-full gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-all duration-200'>

      {/* Tick/Untick button */}
      <div
        onClick={() => {
          toggle(id);
          setIsEditing(false); 
        }}
        className='flex items-center cursor-pointer flex-shrink-0'
        role="button"
        tabIndex="0"
      >
        <img src={iscomplete ? Tick : Untick} className='w-7' alt={iscomplete ? "Completed" : "Mark as complete"} />
      </div>

      {/* Text / Input Field */}
      <div className='flex-1 min-w-0 mx-2 sm:mx-4'>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className='w-full bg-slate-50 p-2 border border-slate-300 rounded-md outline-none'
            autoFocus 
          />
        ) : (
          /*
           * UPDATED BEHAVIOR:
           * If the task is complete, it gets a line-through, faded color,
           * and a 'cursor-not-allowed' icon on hover.
           */
          <p className={`
            text-slate-700 break-all text-lg transition-colors
            ${iscomplete 
              ? "line-through text-slate-400 cursor-not-allowed" 
              : ""
            }
          `}>
            {text}
          </p>
        )}
      </div>

      {/* Edit / Save Buttons */}
      <div className='flex-shrink-0'>
        {isEditing ? (
          <button
            onClick={handleSave}
            className='bg-[#881e1e] text-white px-3 py-1 rounded text-sm font-medium hover:bg-[#630303] transition-colors active:scale-95'
          >
            Save
          </button>
        ) : (
          /*
           * UPDATED BEHAVIOR:
           * The Edit button is always shown.
           * If 'iscomplete' is true, it's disabled and styled to look "blury" (opacity-50)
           * and shows a 'cursor-not-allowed' icon.
           */
          <button
            onClick={() => {
              if (!iscomplete) { // Only enter edit mode if not complete
                setIsEditing(true);
              }
            }}
            className={`
              bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium transition-all
              ${iscomplete
                ? 'opacity-50 cursor-not-allowed' // Disabled "blury" state
                : 'hover:bg-orange-600 active:scale-95' // Active state
              }
            `}
            disabled={iscomplete} // Add the disabled attribute
          >
            Edit
          </button>
        )}
      </div>

      {/* Delete button */}
      <img
        onClick={() => { deleteTodo(id) }}
        src={Delete}
        className='w-6 cursor-pointer flex-shrink-0 ml-2'
        alt="Delete todo"
        role="button"
        tabIndex="0"
      />

    </div>
  )
}

export default Todoitems