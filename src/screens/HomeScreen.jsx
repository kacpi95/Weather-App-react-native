import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AirQualityBox from '../components/Weather/AirQualityBox';
import SunMoonBox from '../components/Weather/SunMoonBox';
import WeatherStats from '../components/Weather/WeatherStats';
import HoursForecast from '../components/Forecast/HoursForecast';
import DaysForecast from '../components/Forecast/DaysForecast';
import CurrentWeather from '../components/Weather/CurrentWeather';
import LocationList from '../components/UI/LocationList';
import SearchBar from '../components/UI/SearchBar';
import { useTheme } from '../components/GlobalSettings/ThemeContext';
import NavigationButtons from '../components/UI/NavigationButtons';
import useWeather from '../hooks/useWeather';

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const {
    weather,
    isOffline,
    loading,
    error,
    refreshing,
    onRefresh,
    handleLocation,
    handleTextDebounce,
    showSearch,
    setSearch,
    locations,
  } = useWeather();

  const { current, location, forecast } = weather;

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
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
          <NavigationButtons />
          {isOffline && <Text style={styles.offlineSupport}>Tryb Offline</Text>}
          {loading ? (
            <ActivityIndicator style={styles.activySupport} />
          ) : error ? (
            <Text style={styles.offlineSupport}>
              Nie udało się pobrać danych pogodowych.
            </Text>
          ) : (
            <View style={styles.weatherContainer}>
              <CurrentWeather
                location={location}
                current={current}
                condition={current?.condition}
              />
              <DaysForecast days={forecast?.forecastday} icon={current} />
              <HoursForecast hours={forecast?.forecastday[0]?.hour} />
              <WeatherStats weatherStats={current} />
              <View style={styles.rowContainer}>
                <SunMoonBox
                  sunset={forecast?.forecastday[0]?.astro?.sunset}
                  sunrise={forecast?.forecastday[0]?.astro?.sunrise}
                />
                <AirQualityBox airQuality={current?.air_quality} />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(51, 139, 211, 0.69)',
  },
  containerDark: {
    backgroundColor: '#1e1e1e',
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
  offlineSupport: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
    marginTop: 20,
  },
  activySupport: {
    size: 'large',
    color: '#fff',
    marginTop: 20,
  },
});
