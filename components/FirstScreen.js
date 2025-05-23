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
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Wilgotność</Text>
                <Text style={styles.statTextData}>{current?.humidity}%</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Odczuwalna</Text>
                <Text style={styles.statTextData}>
                  {Math.round(current?.feelslike_c)}&#176;
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Ciśnienie</Text>
                <Text style={styles.statTextData}>
                  {current?.pressure_mb}mbar
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>Szansa na deszcz</Text>
                <Text style={styles.statTextData}>{current?.precip_mm}%</Text>
              </View>
            </View>
            <View style={styles.forecastContainer}>
              <View style={styles.forecastHeader}>
                <CalendarDaysIcon size={22} color={'white'} />
                <Text style={styles.forecastHeaderText}>
                  5- dniowa prognoza pogody
                </Text>
              </View>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsHorizontalScrollIndicator={true}
              >
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = { weekday: 'long' };
                  let dayName = date.toLocaleDateString('pl-Pl', options);
                  dayName = dayName.split(',')[0];
                  return (
                    <View style={styles.forecastCard} key={index}>
                      <Image
                        // source={require('../assets/images/rainy-day.png')}
                        source={{ uri: 'https:' + current?.condition?.icon }}
                        style={styles.forecastImage}
                      />
                      <Text style={styles.forecastDay}>{dayName}</Text>
                      <Text style={styles.forecastTemp}>
                        {Math.round(item?.day?.avgtemp_c)}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.forecastContainerHours}>
              <View style={styles.forecastHeader}>
                <ClockIcon size={22} color={'white'} />
                <Text style={styles.forecastHeaderText}>
                  24- godzinna prognoza pogody
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                {weather?.forecast?.forecastday[0]?.hour.map(
                  (hourItem, index) => (
                    <View key={index} style={styles.hourCard}>
                      <Text>{hourItem.time.split(' ')[1]}</Text>
                      <Image
                        source={{ uri: 'https:' + hourItem.condition.icon }}
                        style={{ width: 40, height: 40 }}
                      />
                      <Text>{Math.round(hourItem.temp_c)}&#176;</Text>
                    </View>
                  )
                )}
              </ScrollView>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.box}>
                <View style={styles.astronomyIconContainer}>
                  <View style={styles.astronomyHeader}>
                    <SunIcon size={22} color={'white'} />
                    <Text style={styles.astronomyText}>Wschód słońca</Text>
                  </View>
                  <Text style={styles.astronomyHours}>
                    {forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
                <View style={styles.astronomyIconContainer}>
                  <View style={styles.astronomyHeader}>
                    <MoonIcon size={22} color={'white'} />
                    <Text style={styles.astronomyText}>Zachód słońca</Text>
                  </View>
                  <Text style={styles.astronomyHours}>
                    {forecast?.forecastday[0]?.astro?.sunset}
                  </Text>
                </View>
              </View>
              <View style={styles.box}>
                <Text style={styles.astronomyText}>Jakość powietrza</Text>
                <Text style={styles.airQuality}>
                  PM2.5: {weather?.current?.air_quality?.['pm2_5']} µg/m³
                </Text>
                <Text style={styles.airQuality}>
                  PM10: {weather?.current?.air_quality?.['pm10']} µg/m³
                </Text>
                <Text style={styles.airQuality}>
                  NO₂: {weather?.current?.air_quality?.['no2']} µg/m³
                </Text>
                <Text style={styles.airQuality}>
                  SO₂: {weather?.current?.air_quality?.['so2']} µg/m³
                </Text>
                <Text style={styles.airQuality}>
                  EPA Index: {weather?.current?.air_quality?.['us-epa-index']}
                </Text>
              </View>
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
  statsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 5,
  },
  statText: {
    marginLeft: 0,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statTextData: {
    marginRight: 0,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  forecastContainer: {
    flex: 1,
    marginBottom: 8,
    gap: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 8,
  },
  forecastHeaderText: {
    color: 'white',
    fontSize: 16,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  forecastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
    marginBottom: 12,
  },

  forecastImage: {
    width: 44,
    height: 44,
  },

  forecastDay: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },

  forecastTemp: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  astronomyIconContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  astronomyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  astronomyText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  astronomyHours: {
    marginTop: 8,
    color: 'white',
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
    padding: 10,
    borderRadius: 10,
  },
  airQuality: {
    marginTop: 8,
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
