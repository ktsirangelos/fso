// React
import { useState, useEffect } from 'react'

// Components
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

// Services
import personService from './services/personService'

const App = () => {
  // Hooks
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons)
      setPersonsFiltered(initialPersons)
    })
  }, [])

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setPersonsFiltered(
      persons.filter((object) =>
        object.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter handleFilterChange={handleFilterChange} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        personsFiltered={personsFiltered}
        newName={newName}
        setNewName={setNewName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNumberChange={handleNumberChange}
        setPersonsFiltered={setPersonsFiltered}
        setNotificationMessage={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
      <Persons
        persons={persons}
        setPersons={setPersons}
        personsFiltered={personsFiltered}
        setPersonsFiltered={setPersonsFiltered}
      />
    </div>
  )
}

export default App
