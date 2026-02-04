import { useState, useEffect, useCallback, useMemo } from 'react';
import * as Location from 'expo-location';
import debounce from 'lodash/debounce';

import { fetchWeatherForecast, fetchLocations } from '../../api/weatherApi';
import { getData, storeData } from '../utils/storage';

export default function useWeather() {
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setSearch] = useState(false);

  const handleSearch = useCallback(async (value) => {
    try {
      const query = value?.trim?.() ?? '';

      if (query.length <= 2) {
        setLocations([]);
        return;
      }

      const data = await fetchLocations({ cityName: query });
      setLocations(Array.isArray(data) ? data : []);
    } catch (e) {
      setLocations([]);
      console.error('Błąd wyszukiwania lokalizacji:', e);
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 700),
    [handleSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleLocation = useCallback((loc) => {
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
  }, []);

  const fetchMyWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const storedCity = await getData('city');
      const cityName = storedCity?.data || 'Warszawa';
      const data = await fetchWeatherForecast({ cityName, days: '5' });

      setWeather(data);
      setIsOffline(false);
      storeData('weatherData', data);
      storeData('city', cityName);
    } catch (err) {
      console.error('Błąd w fetchMyWeatherData:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

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
    } catch (e) {
      console.error('Błąd podczas pobierania lokalizacji:', e);
      await fetchMyWeatherData();
    } finally {
      setLoading(false);
    }
  }, [fetchMyWeatherData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMyWeatherData();
    setRefreshing(false);
  }, [fetchMyWeatherData]);

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
