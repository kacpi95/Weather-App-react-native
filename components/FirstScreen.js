import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native';
import { fetchLocations } from '../api/weatherApi';
import { debounce } from 'lodash';

export default function FirstScreen() {
  const [showSearch, setSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2]);

  const handleLocation = (loc) => {
    console.log('location:', loc);
  };
  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('../assets/images/sky.jpg')}
        style={styles.imageBackground}
      />
      <SafeAreaView style={styles.safeArea}>
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
                onChange={handleTextDebounce}
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
                    <Text style={styles.locationText}>Kraków, Polska</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={styles.weatherContainer}>
          <Text style={styles.locationText}>
            Kraków,
            <Text style={styles.countryText}> Polska</Text>
          </Text>
          <View style={styles.weatherImageContainer}>
            <Image
              source={require('../assets/images/cloudy-day.png')}
              style={styles.weatherImage}
            />
          </View>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>10&#176;</Text>
            <Text style={styles.description}>Pochmurnie</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statText}>Wilgotność</Text>
              <Text style={styles.statTextData}>50%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statText}>Odczuwalna</Text>
              <Text style={styles.statTextData}>10&#176;</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statText}>Ciśnienie</Text>
              <Text style={styles.statTextData}>1014mbar</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statText}>Szansa na deszcz</Text>
              <Text style={styles.statTextData}>44%</Text>
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
              <View style={styles.forecastCard}>
                <Image
                  source={require('../assets/images/rainy-day.png')}
                  style={styles.forecastImage}
                />
                <Text style={styles.forecastDay}>Poniedziałek</Text>
                <Text style={styles.forecastTemp}>10&#176;</Text>
              </View>
              <View style={styles.forecastCard}>
                <Image
                  source={require('../assets/images/sunny.png')}
                  style={styles.forecastImage}
                />
                <Text style={styles.forecastDay}>Wtorek</Text>
                <Text style={styles.forecastTemp}>13&#176;</Text>
              </View>
              <View style={styles.forecastCard}>
                <Image
                  source={require('../assets/images/cloudy-day.png')}
                  style={styles.forecastImage}
                />
                <Text style={styles.forecastDay}>Środa</Text>
                <Text style={styles.forecastTemp}>15&#176;</Text>
              </View>
              <View style={styles.forecastCard}>
                <Image
                  source={require('../assets/images/rainy-day.png')}
                  style={styles.forecastImage}
                />
                <Text style={styles.forecastDay}>Czwartek</Text>
                <Text style={styles.forecastTemp}>12&#176;</Text>
              </View>
              <View style={styles.forecastCard}>
                <Image
                  source={require('../assets/images/sunny.png')}
                  style={styles.forecastImage}
                />
                <Text style={styles.forecastDay}>Piątek</Text>
                <Text style={styles.forecastTemp}>9&#176;</Text>
              </View>
            </ScrollView>
          </View>
        </View>
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
});
