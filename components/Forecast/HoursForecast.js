import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { ClockIcon } from 'react-native-heroicons/outline';

export default function HoursForecast({ hours }) {
  return (
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
        {hours?.map((hourItem, index) => (
          <View key={index} style={styles.hourCard}>
            <Text style={styles.hourText}>{hourItem.time.split(' ')[1]}</Text>
            <Image
              source={{ uri: 'https:' + hourItem.condition.icon }}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.tempText}>
              {Math.round(hourItem.temp_c)}&#176;
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  forecastContainerHours: {
    marginTop: 20,
    marginBottom: 20,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
    gap: 8,
  },
  forecastHeaderText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  hourCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 12,
    width: 80,
  },
  hourText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  tempText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    marginTop: 4,
  },
});
