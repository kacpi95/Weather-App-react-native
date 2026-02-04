import { View, Text, StyleSheet } from 'react-native';

export default function WeatherStats({ weatherStats }) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statText}>Wilgotność</Text>
        <Text style={styles.statTextData}>{weatherStats?.humidity}%</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statText}>Odczuwalna</Text>
        <Text style={styles.statTextData}>
          {Math.round(weatherStats?.feelslike_c)}&#176;
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statText}>Ciśnienie</Text>
        <Text style={styles.statTextData}>{weatherStats?.pressure_mb}mbar</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statText}>Szansa na deszcz</Text>
        <Text style={styles.statTextData}>{weatherStats?.precip_mm}%</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
    paddingBottom: 10,
    paddingTop: 10,
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
