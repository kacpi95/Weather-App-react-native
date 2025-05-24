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
            <Text>{hourItem.time.split(' ')[1]}</Text>
            <Image
              source={{ uri: 'https:' + hourItem.condition.icon }}
              style={{ width: 40, height: 40 }}
            />
            <Text>{Math.round(hourItem.temp_c)}&#176;</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 8,
  },
});
