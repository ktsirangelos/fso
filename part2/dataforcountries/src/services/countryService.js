import axios from "axios";

const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = "https://api.openweathermap.org/data/3.0/onecall";

const getCountries = async () => {
  try {
    const response = await axios.get(allUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWeather = async (countryObject) => {
  try {
    const response = await axios.get(
      `${weatherUrl}?lat=${countryObject.latlng[0]}&lon=${countryObject.latlng[1]}&exclude=minutely,hourly,daily,alerts&appid={API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const countryService = {
  getCountries,
  getWeather,
};

export default countryService;
