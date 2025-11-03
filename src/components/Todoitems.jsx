import React, { useState } from 'react' // Import useState
import Tick from '../assets/tick.svg'
import Untick from '../assets/un_tick.png'
import Delete from '../assets/delete.svg'

// Accept the new 'editTodo' prop
function Todoitems({ text, id, iscomplete, deleteTodo, toggle, editTodo }) {

  // State to track if this item is being edited
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the text value during editing
  const [editText, setEditText] = useState(text);

  // Handle the save action
  const handleSave = () => {
    // Don't save if the text is empty (after trimming)
    if (editText.trim() === '') {
        return;
    }
    editTodo(id, editText.trim());
    setIsEditing(false); // Exit edit mode
  }

  // Handle 'Enter' key press in edit input
  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  }

  return (
    <div className='flex items-center my-4 w-full gap-2 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 '>

      {/* Tick/Untick button (always visible) */}
      <div
        // *** CHANGE 1: Exit edit mode if toggled ***
        onClick={() => {
          toggle(id);
          setIsEditing(false); // Exit edit mode on toggle
        }}
        className='flex items-center cursor-pointer flex-shrink-0'
        role="button"
        tabIndex="0"
      >
        <img src={iscomplete ? Tick : Untick} className='w-7' alt={iscomplete ? "Completed" : "Mark as complete"} />
      </div>

      {/* Conditional rendering: Show input if editing, otherwise show text */}
      <div className='flex-1 min-w-0 mx-4'>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className='w-full bg-gray-100 p-2 border rounded-md outline-none'
            autoFocus // Automatically focus the input when it appears
          />
        ) : (
          <p className={`text-slate-600 break-all text-[18px] ${iscomplete ? "line-through" : ""}`}>
            {text}
          </p>
        )}
      </div>

      {/* Conditional rendering: Show Save button if editing, otherwise Edit button */}
      <div className='flex-shrink-0'>
        {isEditing ? (
          <button
            onClick={handleSave}
            className='bg-green-500 text-white px-3 py-2 rounded text-sm font-medium active:scale-95'
          >
            Save
          </button>
        ) : (
          // *** CHANGE 2: Only show Edit button if NOT complete ***
          !iscomplete && (
            <button
              onClick={() => setIsEditing(true)}
              className='bg-pink-600 text-white px-3 py-1 rounded text-sm font-medium active:scale-95'
            >
              Edit
            </button>
          )
        )}
      </div>

      {/* Delete button (always visible) */}
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