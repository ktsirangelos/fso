import personService from "../services/personService";

const Persons = ({
  persons,
  setPersons,
  personsFiltered,
  setPersonsFiltered,
}) => {
  const deleteThisPerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person);
      const isId = (obj) => obj.id === person.id;
      const index = persons.findIndex(isId);
      const personsChanged = persons.toSpliced(index, 1);
      setPersonsFiltered(personsChanged);
      setPersons(personsChanged);
    }
  };

  return (
    <div>
      <h2>Persons</h2>
      <table>
        <tbody>
          {personsFiltered.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => deleteThisPerson(person)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
