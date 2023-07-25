import personService from '../services/personService'

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  personsFiltered,
  setPersonsFiltered,
  handleNameChange,
  handleNumberChange,
  setNotificationMessage,
  setNotificationType,
}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const setNotification = (message, type=null) => {
      setNotificationMessage(message)
      setNotificationType(type)
      setTimeout(() => {
        setNotificationType(null)
        setNotificationMessage(null)
      }, 5000)
    }

    const personFound = persons.find(
      (person) => person.name === personObject.name,
    )

    if (persons.indexOf(personFound) !== -1) {
      personService
        .updatePerson(personFound.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== personFound.id ? person : updatedPerson
            ),
          )
          setPersonsFiltered(
            personsFiltered.map((person) =>
              person.id !== personFound.id ? person : updatedPerson,
            ),
          )
          setNotification(`'${personObject.name}' was successfully updated`)
        })
        .catch((error) => {
          const errorMessage = error.response ? error.response.data.error : error.message
          setNotification(errorMessage, 'error')
        }).finally(() => {
          setNewName('')
          setNewNumber('')
        })

    } else {
      personService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setPersonsFiltered(personsFiltered.concat(returnedPerson))
          setNotification(`'${personObject.name}' was successfully added`)
        })
        .catch((error) => {
          setNotification(error.response.data.error, 'error')
        })
        .finally(() => {
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Add a Person</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm

