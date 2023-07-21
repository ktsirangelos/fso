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

    const personFound = persons.find(
      (person) => person.name === personObject.name,
    )

    if (persons.indexOf(personFound) !== -1) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .updatePerson(personFound.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : updatedPerson,
              ),
            )
            setPersonsFiltered(
              personsFiltered.map((person) =>
                person.id !== personFound.id ? person : updatedPerson,
              ),
            )
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            setNotificationType('error')
            setNotificationMessage(error.response.data.error)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
            throw error // prevent further execution
          })
        setNotificationMessage(
          `'${personObject.name}' was successfully updated`,
        )

        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      }
    } else {
      personService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setPersonsFiltered(personsFiltered.concat(returnedPerson))
          setNotificationMessage(
            `'${personObject.name}' was successfully added`,
          )
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setNotificationType('error')
          setNotificationMessage(error.response.data.error)
          setNewName('')
          setNewNumber('')
        })
      setTimeout(() => {
        setNotificationType(null)
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Add Person</h2>
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
