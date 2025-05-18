import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

export default function FirstScreen() {
  const [showSearch, setSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2]);

  const handleLocation = (loc) => {
    console.log('location:', loc);
  };
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
    color: 'white',
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
});
