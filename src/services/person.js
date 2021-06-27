import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = personId => {
  console.log(personId);
  const request = axios.delete(`${baseUrl}/${personId}`)
  const test = request.then(response => response.data)
  return test
}

const update = (updatedPerson, pid) => {
  const request = axios.put(`${baseUrl}/${pid}`, updatedPerson)
  return request.then(response => response.data)
}
const personService = {getAll, create, deletePerson, update}
export default personService