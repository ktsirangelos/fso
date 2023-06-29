import { useEffect } from "react";
import countryService from "../services/countryService";

const Country = ({ countriesFiltered, weather, setWeather }) => {
  useEffect(() => {
    (async () => {
      try {
        const weatherObject = await countryService.getWeather(
          countriesFiltered[0]
        );
        setWeather(weatherObject);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [countriesFiltered, setWeather]);

  return (
    <div>
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
      </div>
      {weather.current &&
        weather.current.weather &&
        weather.current.weather[0] && (
          <div>
            <p>Temperature: {weather.current.temp} Celsius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt={weather.current.weather[0].description}
              width={100}
              height={100}
            />
            <p>Wind: {weather.current.wind_speed} m/s</p>
          </div>
        )}
    </div>
  );
};

export default Country;
