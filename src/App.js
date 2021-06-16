import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  // Holds the current state of an input, updated with each keystroke
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)  // false if any characters in newSearch

  // used to updated inputs
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // If search input has any characters, showAll condition becomes false because there needs to be a filter
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    if (event.target.value.length !== 0) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  // On form submit, stop refresh, create new object and check for duplicates
  const handlePersonsChange = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,

    }
    checkDuplicateName(personObject)
    setNewName('')  // Clears inputs
    setNewNumber('')
  }
  
  // Checks current names in phonebook, alerting the user if they are trying to add a duplicate name
  const checkDuplicateName = (personInfo) => {
    for (let i in persons) {
      if (personInfo.name.toLowerCase() === persons[i].name.toLowerCase()) {
        window.alert(`${newName} is already added to phonebook`)
        return
      }
    }
    setPersons(persons.concat(personInfo))  // concat returns new object

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text='Search' value={newSearch} setFunction={handleSearchChange}/>

      <h2>Add New</h2>

      <PersonForm
        handlePersonsChange={handlePersonsChange}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons showAll={showAll} persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App