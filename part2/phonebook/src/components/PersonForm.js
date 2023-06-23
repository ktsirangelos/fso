import personService from "../services/personService";

const PersonForm = ({
  persons,
  personsStr,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  filter,
  setFilter,
  handleNameChange,
  handleNumberChange,
}) => {
  const addPerson = (event) => {
    event.preventDefault();
    const personObjects = {
      name: newName,
      number: newNumber,
    };

    const personObjectsStr = JSON.stringify(personObjects);
    const personObjectsStrSpl = personObjectsStr.split(",", 1);

    const personFound = persons.find(
      (person) => person.name === personObjects.name
    );

    if (personsStr.includes(personObjectsStrSpl)) {
      if (
        window.confirm(
          `${personObjects.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personFound.id, personObjects)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : updatedPerson
              )
            );
            setFilter(
              filter.map((person) =>
                person.id !== personFound.id ? person : updatedPerson
              )
            );
          });
      }
    } else {
      personService.create(personObjects).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setFilter(filter.concat(returnedNote));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h3>Add Contact</h3>
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
