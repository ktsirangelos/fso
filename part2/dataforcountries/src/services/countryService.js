import axios from "axios";

const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const singleUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";
// const weatherUrl = "https://api.openweathermap.org/data/3.0/onecall";
const testUrl = "https://jsonplaceholder.typicode.com/albums/1";

const getAllCountries = async () => {
  const request = axios.get(allUrl);
  const response = await request;
  return response.data;
};

const getSingleCountry = async (countryName) => {
  const request = axios.get(`${singleUrl}/${countryName}`);
  const response = await request;
  return response.data;
};

// const getSingleWeather = (countryObject) => {
//   const request = axios.get(
//     `${weatherUrl}?lat=${countryObject.latlng[0]}&lon=${countryObject.latlng[1]}&exclude=minutely,hourly,daily,alerts&appid={API_KEY}`
//   );
//   return request.then((response) => response.data);
// };

const getSingleWeather = async (something) => {
  const request = axios.get(`${testUrl}/${something}`);
  const response = await request;
  return response.data;
};

const countryService = {
  getAllCountries,
  getSingleCountry,
  getSingleWeather,
};

export default countryService;
