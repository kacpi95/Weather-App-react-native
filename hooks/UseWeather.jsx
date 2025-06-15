import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherForecast, fetchLocations } from '../api/weatherApi';
import { getData, storeData } from '../utils/storage';
import * as Location from 'expo-location';
import debounce from 'lodash/debounce';

export default function UseWeather() {
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setSearch] = useState(false);

  const handleSearch = async (value) => {
    if (value.length > 2) {
      const data = await fetchLocations({ cityName: value });
      setLocations(data);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 1200), []);

  const handleLocation = (loc) => {
    setLocations([]);
    setSearch(false);
    setLoading(true);
    setError(false);
    fetchWeatherForecast({ cityName: loc.name, days: '5' })
      .then((data) => {
        setWeather(data);
        storeData('weatherData', data);
        storeData('city', loc.name);
        setIsOffline(false);
      })
      .catch((e) => {
        console.error('Błąd pobierania danych pogodowych:', e);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const fetchMyWeatherData = async () => {
    try {
      setLoading(true);
      const cityName = (await getData('city')) || 'Warszawa';
      const data = await fetchWeatherForecast({ cityName, days: '5' });
      setWeather(data);
      setIsOffline(false);
    } catch (err) {
      console.error('Błąd w fetchMyWeatherData:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialWeather = useCallback(async () => {
    const savedData = await getData('weatherData');
    if (savedData) {
      setWeather(savedData);
      setIsOffline(true);
      setLoading(false);
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log(
          'Brak dostępu do lokalizacji. Wczytywanie domyślnego miasta'
        );
        await fetchMyWeatherData();
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      };

      const data = await fetchWeatherForecast({ coords, days: '5' });
      setWeather(data);
      setIsOffline(false);
      storeData('weatherData', data);
      storeData('city', data.location.name);
    } catch (error) {
      console.error('Błąd podczas pobierania lokalizacji:', error);
      await fetchMyWeatherData();
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMyWeatherData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchInitialWeather();
  }, [fetchInitialWeather]);

  return {
    weather,
    isOffline,
    loading,
    error,
    refreshing,
    onRefresh,
    handleLocation,
    handleTextDebounce: debouncedSearch,
    showSearch,
    setSearch,
    locations,
  };
}
