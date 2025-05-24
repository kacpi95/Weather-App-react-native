import { Text, View, Image, StyleSheet } from 'react-native';

export default function CurrentWeather({ location, current, condition }) {
  return (
    <>
      <Text style={styles.locationText}>
        {location?.name},<Text style={styles.countryText}> {location?.country}</Text>
      </Text>
      <View style={styles.weatherImageContainer}>
        <Image
          // source={require('../assets/images/cloudy-day.png')}
          source={{ uri: 'https:' + condition?.icon }} ////////////    zmiana icon na tło
          style={styles.weatherImage}
        />
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.temperature}>{Math.round(current?.temp_c)}&#176;</Text>
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
    marginTop: 10,
    marginBottom: 20,
  },
});
