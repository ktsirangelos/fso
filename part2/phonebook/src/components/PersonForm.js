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
      id: persons.length + 1,
    };

    const personObjectsStr = JSON.stringify(personObjects);
    const personObjectsStrSpl = personObjectsStr.split(",", 1);

    if (personsStr.includes(personObjectsStrSpl)) {
      alert(`${personObjects.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObjects));
      setFilter(filter.concat(personObjects));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h3>Add a New Person</h3>
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
