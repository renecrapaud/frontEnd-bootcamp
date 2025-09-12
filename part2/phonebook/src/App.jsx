import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const bookFiltered = (searchField == '') ? persons : persons.filter(person => person.name.includes(searchField))

  const addName = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchField = (event) => {
    setSearchField(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchField={searchField} hdlSearchFld={handleSearchField}/>
      <PersonForm addName={addName} newName={newName} hdlNameChg={handleNameChange} hdlNumberChg={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personsFiltered={bookFiltered}/>
    </div>
  )
}

export default App