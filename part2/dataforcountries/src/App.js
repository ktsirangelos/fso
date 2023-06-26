// React
import { useState, useEffect } from "react";

// Services
import countryService from "./services/countryService";

// Components
const Filter = ({ handleFilterChange, countriesFiltered }) => {
  console.log(countriesFiltered);
  return (
    <div>
      <h2>Filter</h2>
      <form>
        <div>
          Keyword: <input onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
};

const Countries = ({ countriesFiltered, setCountriesFiltered }) => {
  const showThisCountry = (country) => {
    setCountriesFiltered([country]);
  };
  if (countriesFiltered.length > 10) {
    return "Too many matches, specify another filter";
  } else if (countriesFiltered.length === 1) {
    return (
      <div>
        <h3>{countriesFiltered[0].name.common}</h3>
        <p>Capital: {countriesFiltered[0].capital[0]}</p>
        <p>Area: {countriesFiltered[0].area}</p>
        <h4>Languages</h4>
        <ul>
          {Object.values(countriesFiltered[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={countriesFiltered[0].flags.svg}
          alt={countriesFiltered[0].flags.alt}
          width={200}
          height={200}
        />
      </div>
    );
  } else {
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
  }
};

function App() {
  // Hooks
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);

  useEffect(() => {
    countryService.getAllCountries().then((initialCountries) => {
      setCountries(initialCountries);
      setCountriesFiltered(initialCountries);
    });
  }, []);

  // Event Handlers
  const handleFilterChange = (event) => {
    setCountriesFiltered(
      countries.filter((object) =>
        object.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h1>Country Search</h1>
      <Filter
        handleFilterChange={handleFilterChange}
        countriesFiltered={countriesFiltered}
      />
      <h2>Countries</h2>
      <Countries
        countriesFiltered={countriesFiltered}
        setCountriesFiltered={setCountriesFiltered}
      />
    </div>
  );
}

export default App;
