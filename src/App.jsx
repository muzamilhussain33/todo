import React from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    // Changed 'grid' to 'grid place-items-center' for better centering
    <div className=' flex justify-center p-4 min-h-screen'>
      <Todo/>
    </div>
  )
}

export default App