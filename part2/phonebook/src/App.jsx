import { useState } from 'react'

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
      <div>
        <span>filter shown with: </span>
        <input value={searchField} onChange={handleSearchField}/>  
      </div>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {bookFiltered.map(person => <p key={person.name}>{person.name} <span>{person.number}</span></p>)}
    </div>
  )
}

export default App