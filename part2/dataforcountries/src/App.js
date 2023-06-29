// React
import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [weather, setWeather] = useState({});
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchedCountries = await countryService.getCountries();
        setCountries(fetchedCountries);
        setCountriesFiltered(fetchedCountries);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Event Handlers
  const handleFilterChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setHasStartedTyping(inputValue !== "");
    setCountriesFiltered(
      countries.filter((countryObject) =>
        countryObject.name.common.toLowerCase().includes(inputValue)
      )
    );
  };

  // Conditions
  const conditions = {
    moreThanTen: countriesFiltered.length > 10,
    moreThanOne: 1 < countriesFiltered.length && countriesFiltered.length < 10,
    exactlyOne: countriesFiltered.length === 1,
  };

  return (
    <div>
      <h1>Country Search</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Countries</h2>
      {!hasStartedTyping && <p>Type a country name</p>}
      {hasStartedTyping && conditions.moreThanTen && (
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
