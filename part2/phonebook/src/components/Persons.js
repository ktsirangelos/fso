const Name = ({ person }) => {
  return <td>{person.name}</td>;
};

const Number = ({ person }) => {
  return <td>{person.number}</td>;
};

const Persons = ({ filter }) => {
  return (
    <div>
      <h3>Contacts</h3>
      <table>
        <tbody>
          {filter.map((person) => (
            <tr key={person.id}>
              <Name person={person} />
              <Number person={person} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
