import React from 'react'

const Persons = ({showAll, persons, handlePersonDelete, newSearch}) => {
  // My first conditional operator!
  // const result = condition ? val1 : val2 Meaning if condition is True then val1 is used and val2 is used when False.
  const peopleToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) === true)

  return (<div>{peopleToShow.map(person => 
  <div key={person.id}>
    {person.name} {person.number} 
    <button onClick={() => handlePersonDelete(person)}>Delete</button>
  </div>
  )}
  </div>)
}

export default Persons