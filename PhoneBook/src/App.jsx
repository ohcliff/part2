import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {
  /* Initialize state to the array of persons objects */
  const [persons, setPersons] = useState([])  
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [filteredPersons, setFilter] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.some(person => person.name === newName)
    if (duplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewNumber('')
    setNewName('')
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    const searchTarget = event.target.value.toLowerCase()
    setNewSearch(searchTarget)
    const filtered = persons.filter(person => person.name.toLowerCase().includes(searchTarget))
    setFilter(filtered)
  }
  const personsToDisplay = newSearch === '' ? persons : filteredPersons;

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
        newSearch={newSearch}
        handleNewSearch={handleNewSearch}
        />
      <h2>add a new</h2>
        <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        />
      <h2>Numbers</h2>
        <Persons 
        personsToDisplay={personsToDisplay}
        />
    </div>
  )
}

export default App