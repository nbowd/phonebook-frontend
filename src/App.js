import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'


const App = () => {
  const [persons, setPersons] = useState([])

  // Holds the current state of an input, updated with each keystroke
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)  // false if any characters in newSearch
  const [filteredPersons, setFilteredPerson] = useState(null)

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
  const handlePersonsAdd = (event) => {
    event.preventDefault()
    const pid = () => {
      if (persons.length === 0) {return 1}
      return persons[persons.length-1].id +1
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: pid(),

    }
    if (checkDuplicateName(personObject)) {return}
    addPerson(personObject)
    setNewName('')  // Clears inputs
    setNewNumber('')
  }

  const handlePersonsDelete = (singlePerson) => {
    console.log(singlePerson);
    if (window.confirm(`Delete ${singlePerson.name}?`)) {
      personService
        .deletePerson(singlePerson.id)
        .then(() => {
          console.log(persons);
          const filteredPersons = persons.filter(person => person.id !== singlePerson.id)
          setPersons(filteredPersons)
        })
    }
   
  }
  
  const updatePerson = (personInfo, oldId) => {
    personService
      .update(personInfo, oldId)
      .then(() => {
        const updatedPpl = persons.map(person => {
          if (person.name === personInfo.name) {
            return {...personInfo, id:person.id}
          }
          return person
        })
        setPersons(updatedPpl)
        setNewName('')
        setNewNumber('')
      })
  }
  // Checks current names in phonebook, alerting the user if they are trying to add a duplicate name
  const checkDuplicateName = (personInfo) => {
    for (let i in persons) {
      if (personInfo.name.toLowerCase() === persons[i].name.toLowerCase()) {
        if(window.confirm(`${newName} is already added to phonebook, update number?`)) {
          updatePerson(personInfo, persons[i].id)
        }
        return true
      }
    }
    return false
  }

  const addPerson = personInfo => {
    setPersons(persons.concat(personInfo))  // concat returns new object
    personService
      .create(personInfo)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(persons.concat(initialPersons))
      })
// eslint-disable-next-line
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text='Search' value={newSearch} setFunction={handleSearchChange}/>

      <h2>Add New</h2>

      <PersonForm
        handlePersonsAdd={handlePersonsAdd}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons 
        showAll={showAll} 
        persons={persons}
        handlePersonDelete={handlePersonsDelete} 
        newSearch={newSearch}
      />
    </div>
  )
}

export default App