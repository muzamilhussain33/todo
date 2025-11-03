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
    /* * MAIN CONTAINER:
     * - Default is 'flex-col' (mobile)
     * - 'sm:flex-row' and 'sm:items-center' apply on small screens and up
    */
    <div className='flex flex-col sm:flex-row sm:items-center my-3 w-full p-3 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-all duration-200'>

      {/* --- TOP GROUP (TICK + TEXT) --- */}
      {/* This group is always a row, and takes up remaining space ('flex-1') */}
      <div className='flex items-center flex-1 min-w-0'>
      
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
        {/* Added 'ml-4' for spacing from the tick button */}
        <div className='flex-1 min-w-0 ml-4'>
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
      </div> {/* --- END TOP GROUP --- */}


      {/* --- BOTTOM/RIGHT GROUP (BUTTONS) --- */}
      {/* * This group stacks below on mobile ('mt-3', 'border-t')
       * and moves to the side on desktop ('sm:mt-0', 'sm:border-t-0')
       * 'justify-end' pushes buttons to the right on mobile
      */}
      <div className='flex items-center justify-end w-full sm:w-auto flex-shrink-0 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 sm:pl-3 gap-2'>
        
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
            <button
              onClick={() => {
                if (!iscomplete) { 
                  setIsEditing(true);
                }
              }}
              className={`
                bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium transition-all
                ${iscomplete
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-orange-600 active:scale-95'
                }
              `}
              disabled={iscomplete}
            >
              Edit
            </button>
          )}
        </div>

        {/* Delete button */}
        {/* 'ml-2' was removed, parent 'gap-2' now handles spacing */}
        <img
          onClick={() => { deleteTodo(id) }}
          src={Delete}
          className='w-6 cursor-pointer flex-shrink-0'
          alt="Delete todo"
          role="button"
          tabIndex="0"
        />
      </div> {/* --- END BOTTOM/RIGHT GROUP --- */}

    </div>
  )
}

export default Todoitems