const Countries = ({ countriesFiltered, setCountriesFiltered }) => {
  const showThisCountry = (country) => {
    setCountriesFiltered([country]);
  };

  return (
    <div>
      <table>
        <tbody>
          {countriesFiltered.map((country) => (
            <tr key={country.name.common}>
              <td>{country.name.common}</td>
              <td>
                <button onClick={() => showThisCountry(country)}>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Countries;
