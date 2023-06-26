import axios from "axios";
const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const singleUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getAllCountries = () => {
  const request = axios.get(allUrl);
  return request.then((response) => response.data);
};

const getSingleCountry = (countryName) => {
  const request = axios.get(singleUrl / { countryName });
  return request.then((response) => response.data);
};

const countryService = {
  getAllCountries,
  getSingleCountry,
};

export default countryService;
