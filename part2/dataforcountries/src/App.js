// React
import { useState, useEffect } from "react";

// Services
import countryService from "./services/countryService";

// Components
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  // Hooks
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [weather, setWeather] = useState([]);

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

  // Conditions
  const conditions = {
    moreThanTen: countriesFiltered.length > 10,
    moreThanOne: 1 < countriesFiltered.length && countriesFiltered.length < 10,
    exactlyOne: countriesFiltered.length === 1,
  };

  // Return
  return (
    <div>
      <h1>Country Search</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Countries</h2>
      {conditions.moreThanTen && (
        <p>Too many matches, specify another filter</p>
      )}
      {conditions.moreThanOne && (
        <Countries
          countriesFiltered={countriesFiltered}
          setCountriesFiltered={setCountriesFiltered}
          weather={weather}
          setWeather={setWeather}
        />
      )}
      {conditions.exactlyOne && (
        <Country
          countriesFiltered={countriesFiltered}
          weather={weather}
          setWeather={setWeather}
        />
      )}
    </div>
  );
}

export default App;
