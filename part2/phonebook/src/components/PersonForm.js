import personService from "../services/personService";

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
    event.preventDefault();
    const personObjects = {
      name: newName,
      number: newNumber,
    };

    const personFound = persons.find(
      (person) => person.name === personObjects.name
    );

    if (persons.indexOf(personFound) !== -1) {
      if (
        window.confirm(
          `${personObjects.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(personFound.id, personObjects)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : updatedPerson
              )
            );
            setPersonsFiltered(
              personsFiltered.map((person) =>
                person.id !== personFound.id ? person : updatedPerson
              )
            );
          })
          .catch(() => {
            setNotificationMessage(
              `'${personObjects.name}' was already removed from the server`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
          });
        setNotificationMessage(
          `'${personObjects.name}' was successfully updated`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      }
    } else {
      personService.createPerson(personObjects).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setPersonsFiltered(personsFiltered.concat(returnedNote));
      });
      setNotificationMessage(`'${personObjects.name}' was successfully added`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    }
    setNewName("");
    setNewNumber("");
  };

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
  );
};

export default PersonForm;
