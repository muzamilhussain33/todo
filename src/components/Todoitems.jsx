import React from 'react'
import Tick from '../assets/tick.svg'
import Untick from '../assets/un_tick.png'
import Delete from '../assets/delete.svg'

function Todoitems({text, id, iscomplete, deleteTodo, toggle}) {
  return (
    <div className='flex items-center my-3  border-3  border-red-500  w-11/12 gap-2'>

      <div onClick={() => {toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
        <img src={iscomplete ? Tick :Untick } className='w-7'/>
        <p className={`text-slate-700 ml-4  w-[100px] sm:w-10/12 text-[17Spx] ${iscomplete ? "line-through" :""}`}>{text}</p>
      </div>

        <img onClick={() => {deleteTodo(id)}} src={Delete} className='w-5 cursor-pointer'/>

    </div>
  )
}

export default Todoitems
