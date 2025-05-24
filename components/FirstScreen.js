import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
} from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native';
import { fetchLocations, fetchWeatherForecast } from '../api/weatherApi';
import AirQualityBox from './AirQualityBox';
import SunMoonBox from './SunMoonBox';
import WeatherStats from './WeatherStats';
import HoursForecast from './HoursForecast';
import DaysForecast from './DaysForecast';
import CurrentWeather from './CurrentWeather';
import LocationList from './LocationList';

export default function FirstScreen() {
  const [showSearch, setSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  const handleLocation = (loc) => {
    console.log('location:', loc);
    setLocations([]);
    setSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '5',
    }).then((data) => {
      setWeather(data);
      console.log('forc', data);
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
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
      cityName: 'Warszawa',
      days: '5',
    }).then((data) => {
      setWeather(data);
    });
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location, forecast } = weather;
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        // source={require('../assets/images/sky.jpg')}
        style={styles.imageBackground}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchContainer}>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: showSearch
                    ? 'rgb(255, 255, 255)'
                    : 'transparent',
                },
              ]}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder='Szukaj miasta'
                  placeholderTextColor={'lightgray'}
                  style={styles.input}
                />
              ) : null}
              <TouchableOpacity
                onPress={() => setSearch(!showSearch)}
                style={styles.searchButton}
              >
                <MagnifyingGlassIcon size={25} color='black' />
              </TouchableOpacity>
            </View>
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
    marginTop: 30,
    height: '7%',
    marginHorizontal: 16,
    position: 'relative',
    zIndex: 50,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  input: {
    paddingLeft: 24,
    height: 40,
    paddingBottom: 4,
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  searchButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 50,
    padding: 12,
    margin: 4,
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
});
