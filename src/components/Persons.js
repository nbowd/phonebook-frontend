import React from 'react'

const Persons = ({showAll, persons, newSearch}) => {
  // My first conditional operator!
  // const result = condition ? val1 : val2 Meaning if condition is True then val1 is used and val2 is used when False.
  const peopleToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) === true)

  return (<div>{peopleToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>)
}

export default Persons