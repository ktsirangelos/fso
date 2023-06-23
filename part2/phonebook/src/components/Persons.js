import personService from "../services/personService";

const Persons = ({ persons, setPersons, filter, setFilter }) => {
  const deleteThisPerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person);
      const isId = (obj) => obj.id === person.id;
      const index = persons.findIndex(isId);
      const personsChanged = persons.toSpliced(index, 1);
      setFilter(personsChanged);
      setPersons(personsChanged);
    }
  };

  return (
    <div>
      <h3>Contacts</h3>
      <table>
        <tbody>
          {filter.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => deleteThisPerson(person)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
