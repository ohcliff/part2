import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/person'


const App = () => {
  /* Initialize state to the array of persons objects */
  const [persons, setPersons] = useState([])  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  },[])


  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [filteredPersons, setFilter] = useState([])

  const addPerson = (event) => {
    event.preventDefault();
    
    const duplicate = persons.some(person => person.name === newName);
  
    if (duplicate) {
      const personToUpdate = persons.find(n => n.name === newName);
      const confirmChange = window.confirm(`${personToUpdate.name} is already added to the phonebook, replace the old number with a new one?`);
  
      if (confirmChange) {
        const changedPerson = { ...personToUpdate, number: newNumber };
  
        personService.update(changedPerson)
          .then(updatedPerson => {
            // Update the state to reflect the change
            setPersons(persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person
            ));
            // Clear input fields
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            // Handle error, if any
            console.error('Error updating person:', error);
          });
      }
  
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.error('Error creating person:', error);
    });
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

  const deletePerson = (id) => {
    const personIndex = persons.findIndex(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${persons[personIndex].name}?`)
    if (confirmDelete) {
      const updatedPersons = [...persons]
      // Remove the person from the copy of the array
      updatedPersons.splice(personIndex, 1);
  
      // Update the state to reflect the deletion
      setPersons(updatedPersons);
    
      // Call the delete service function to remove the person from the database
      personService.remove(id);
    }
    }
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
        deletePerson = {deletePerson}
        />
    </div>
  )
}

export default App