import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { weatherImages } from '../../api/index';

export default function CurrentWeather({ location, current, condition }) {
  const isLoading = !location || !current || !condition;

  const imageKey = condition?.text?.toLowerCase() || '';
  const weatherIcon = weatherImages[imageKey] || weatherImages['other'];

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color='white' />
        <Text style={styles.loadingText}>Ladowanie pogody...</Text>
      </View>
    );
  }
  return (
    <>
      <Text style={styles.locationText}>
        {location?.name || 'Brak miasta'},
        <Text style={styles.countryText}>
          {location?.country || 'Brak kraju'}
        </Text>
      </Text>
      <View style={styles.weatherImageContainer}>
        <Image source={weatherIcon} style={styles.weatherImage} />
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.temperature}>
          {Math.round(current?.temp_c)}&#176;
        </Text>
        <Text style={styles.description}>{condition?.text}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
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
    width: 200,
    height: 208,
    resizeMode: 'contain',
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
    marginTop: 10,
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
});
