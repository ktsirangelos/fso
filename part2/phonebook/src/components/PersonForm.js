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
  setErrorMessage,
  setErrorType,
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
            setErrorMessage(
              `'${personObjects.name}' was already removed from the server`
            );
            setErrorType("error");
            setTimeout(() => {
              setErrorMessage(null);
              setErrorType(null);
            }, 5000);
          });
        setErrorMessage(`'${personObjects.name}' was successfully updated`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } else {
      personService.createPerson(personObjects).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setPersonsFiltered(personsFiltered.concat(returnedNote));
      });
      setErrorMessage(`'${personObjects.name}' was successfully added`);
      setTimeout(() => {
        setErrorMessage(null);
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
