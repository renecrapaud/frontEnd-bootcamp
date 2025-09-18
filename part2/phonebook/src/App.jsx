import { useState, useEffect } from 'react'
import phoneBookEntry from './services/phoneBookEntry'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './Index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const bookFiltered = (searchField == '') ? persons : persons.filter(person => person.name.includes(searchField))
  const [successMsg, setsuccessMsg] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    const newId = persons.length + 1
    const nameObject = {
      name: newName,
      number: newNumber,
      id: newId.toString()
    }
    const personReg = persons.find(person => person.name === newName)
    if(personReg && personReg.name===newName){
      if(!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        return
      } else {
        phoneBookEntry.update(personReg.id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== personReg.id ? person : nameObject))
          const msjSuccess = `${newName} entry updated`
          setsuccessMsg(msjSuccess)
          setTimeout(() => setsuccessMsg(null), 5000)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      phoneBookEntry.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        const msjSuccess = 'New entry added'
        setsuccessMsg(msjSuccess)
        setTimeout(() => setsuccessMsg(null), 5000)
        setNewName('')
        setNewNumber('')
      })
    }
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

  const handleClickDelete = (id) => {
    phoneBookEntry.deleteEntry(id).then(response => {
      const msjSuccess = 'Entry deleted'
      setPersons(persons.filter(pers => pers.id !== id))
      setsuccessMsg(msjSuccess)
      setTimeout(() => setsuccessMsg(null), 5000)
    })
  }

  useEffect(() => {
    phoneBookEntry
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMsg} />
      <Filter searchField={searchField} hdlSearchFld={handleSearchField}/>
      <PersonForm addName={addName} newName={newName} hdlNameChg={handleNameChange} 
        hdlNumberChg={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personsFiltered={bookFiltered} hdlClickDel={handleClickDelete}/>
    </div>
  )
}

export default App