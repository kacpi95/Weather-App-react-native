import { View, Text, StyleSheet } from 'react-native';

export default function AirQualityBox({ airQuality }) {
  return (
    <View style={styles.box}>
      <Text style={styles.astronomyText}>Jakość powietrza</Text>
      <Text style={styles.airQuality}>
        PM2.5: {Math.round(airQuality?.pm2_5)} µg/m³
      </Text>
      <Text style={styles.airQuality}>
        PM10: {Math.round(airQuality?.pm10)} µg/m³
      </Text>
      <Text style={styles.airQuality}>
        NO₂: {Math.round(airQuality?.no2)} µg/m³
      </Text>
      <Text style={styles.airQuality}>
        SO₂: {Math.round(airQuality?.so2)} µg/m³
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    padding: 14,
    borderRadius: 16,
  },
  astronomyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  airQuality: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 2,
    marginBottom: 10,
    textAlign: 'center',
  },
});
