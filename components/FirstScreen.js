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
              <View style={styles.locationsList}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderStyle = showBorder ? styles.locationItemBorder : {};
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      style={[styles.locationItem, borderStyle]}
                    >
                      <MapPinIcon size={20} color='gray' />
                      <Text style={styles.locationText}>
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View style={styles.weatherContainer}>
            <Text style={styles.locationText}>
              {location?.name}
              <Text style={styles.countryText}> {location?.country}</Text>
            </Text>
            <View style={styles.weatherImageContainer}>
              <Image
                // source={require('../assets/images/cloudy-day.png')}
                source={{ uri: 'https:' + current?.condition?.icon }} ////////////    zmiana icon na tło
                style={styles.weatherImage}
              />
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>
                {Math.round(current?.temp_c)}&#176;
              </Text>
              <Text style={styles.description}>{current?.condition?.text}</Text>
            </View>
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
  locationsList: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#D1D5DB',
    top: 64,
    borderRadius: 24,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  locationItemBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#6B7280',
  },
  locationText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 8,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  locationText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  countryText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  weatherImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weatherImage: {
    width: 208,
    height: 208,
  },
  weatherInfo: {
    gap: 8,
  },
  temperature: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },
  description: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
