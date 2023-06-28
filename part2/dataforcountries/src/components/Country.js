import { useEffect } from "react";
import countryService from "../services/countryService";

const Country = ({ countriesFiltered, weather, setWeather }) => {
  useEffect(() => {
    (async () => {
      const weatherObject = await countryService.getSingleWeather("photos");
      setWeather(weatherObject[0]);
    })();
  }, [setWeather]);

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
      <h3>Weather in {countriesFiltered[0].name.common}</h3>

      <p>Temperature: {weather.id} Celsius</p>
      <img
        src={`${weather.url}`}
        alt={`${weather.title}`}
        width={100}
        height={100}
      />
      <p>Wind: {weather.id} m/s</p>
    </div>
  );
};

export default Country;
