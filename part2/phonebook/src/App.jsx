import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
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
    axios.post('http://localhost:3001/persons', nameObject).then(response => {
      console.log(response.data)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    })
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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