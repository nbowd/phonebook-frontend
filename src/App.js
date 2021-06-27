import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/person'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])

  // Holds the current state of an input, updated with each keystroke
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)  // false if any characters in newSearch
  // eslint-disable-next-line
  const [filteredPersons, setFilteredPerson] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newMessage, setMessage] = useState(null)

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
    
    // If list is empty sets id to 1, others sets to the new highest id
    const pid = () => {
      if (persons.length === 0) {return 1}
      return persons[persons.length-1].id + 1
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: pid(),

    }

    // if duplicate checks to update existing entry and returns true, otherwise returns false
    if (checkDuplicateName(personObject)) {return} 

    addPerson(personObject)
    setNewName('')  // Clears inputs
    setNewNumber('')
  }

  // Confirms with user that they want to delete, passes id to delete request, filters out the deleted name 
  // then rerenders the page with the correct information
  const handlePersonsDelete = (singlePerson) => {
    if (window.confirm(`Delete ${singlePerson.name}?`)) {
      personService
        .deletePerson(singlePerson.id)
        .then(() => {
          const filteredPersons = persons.filter(person => person.id !== singlePerson.id)
          setPersons(filteredPersons)
        })
        .catch(error => {
          setErrorMessage(
            `'${singlePerson.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
   
  }
  
  // checks if user wants to update entry number when duplicate names are added 
  const updatePerson = (personInfo, oldId) => {
    personService
      .update(personInfo, oldId)
      .then(() => {
        // Modifies the person to be updated by replacing their object with another that has the same pid
        const updatedPpl = persons.map(person => {
          if (person.name === personInfo.name) {
            return {...personInfo, id:person.id}
          }
          return person
        })
        
        // re-render screen with current information
        setPersons(updatedPpl)
        setNewName('')
        setNewNumber('')
        setMessage(
          `Contact number updated for '${personInfo.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      setMessage(
        `Added ${personInfo.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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

      <Notification message={errorMessage} className={'error'}/>
      <Notification message={newMessage} className={'message'}/>
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