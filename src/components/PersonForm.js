import React from 'react'

const PersonForm = ({handlePersonsChange, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={handlePersonsChange}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    </div>   
  )
}

export default PersonForm