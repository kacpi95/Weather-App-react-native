import axios from 'axios';
import { apiKey } from './index';

const forecastEndpoint = (params) => {
  const query =
    params.coords?.lat && params.coords?.lon
      ? `${params.coords.lat},${params.coords.lon}`
      : params.cityName;

  return `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=${params.days}&aqi=yes&alerts=no&lang=pl`;
};
const locationEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.error('API call failed:', err.message);
    throw new Error('Weather API failed');
  }
};

export const fetchWeatherForecast = (params) => {
  return apiCall(forecastEndpoint(params));
};
export const fetchLocations = (params) => {
  return apiCall(locationEndpoint(params));
};
