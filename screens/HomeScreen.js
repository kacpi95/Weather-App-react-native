import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { fetchLocations, fetchWeatherForecast } from '../api/weatherApi';
import AirQualityBox from '../components/Weather/AirQualityBox';
import SunMoonBox from '../components/Weather/SunMoonBox';
import WeatherStats from '../components/Weather/WeatherStats';
import HoursForecast from '../components/Forecast/HoursForecast';
import DaysForecast from '../components/Forecast/DaysForecast';
import CurrentWeather from '../components/Weather/CurrentWeather';
import LocationList from '../components/UI/LocationList';
import SearchBar from '../components/UI/SearchBar';
import { getData, storeData } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/GlobalSettings/ThemeContext';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [showSearch, setSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const handleLocation = (loc) => {
    setLocations([]);
    setSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '5',
    }).then((data) => {
      setWeather(data);
      storeData('city', loc.name);
    });
  };
  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log(
            'Brak dostępu do lokalizacji. Wczytywanie domyślnego miasta'
          );
          fetchMyWeatherData();
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const coords = {
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
        };

        const data = await fetchWeatherForecast({
          coords,
          days: '5',
        });

        if (data) {
          setWeather(data);
          storeData('city', data.location.name);
        } else {
          fetchMyWeatherData();
        }
      } catch (error) {
        console.error('Błąd podczas pobierania lokalizacji:', error);
        fetchMyWeatherData();
      }
    })();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Warszawa';
    if (myCity) cityName = myCity;
    fetchWeatherForecast({
      cityName,
      days: '5',
    }).then((data) => {
      setWeather(data);
    });
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location, forecast } = weather;
  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsButtonText}>Ustawienia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsButtonText}>O aplikacji</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <SearchBar
              showSearch={showSearch}
              setSearch={setSearch}
              onChangeText={handleTextDebounce}
            />
            {locations.length > 0 && showSearch ? (
              <LocationList
                locations={locations}
                handleLocation={handleLocation}
              />
            ) : null}
          </View>
          <View style={styles.weatherContainer}>
            <CurrentWeather
              location={location}
              current={current}
              condition={current?.condition}
            />
            <DaysForecast
              days={weather?.forecast?.forecastday}
              icon={current}
            />
            <HoursForecast hours={weather?.forecast?.forecastday[0]?.hour} />
            <WeatherStats weatStat={current} />
            <View style={styles.rowContainer}>
              <SunMoonBox
                sunset={forecast?.forecastday[0]?.astro?.sunset}
                sunrise={forecast?.forecastday[0]?.astro?.sunrise}
              />
              <AirQualityBox airQuality={current?.air_quality} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgb(51, 139, 211)',
  },
  containerDark: {
    backgroundColor: '#1e1e1e',
  },
  imageBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(51, 139, 211)',
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 50,
    height: '7%',
    marginHorizontal: 16,
    position: 'relative',
    zIndex: 50,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginTop: 40,
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  settingsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
