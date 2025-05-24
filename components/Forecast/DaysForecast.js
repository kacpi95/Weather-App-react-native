import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/outline';

export default function DaysForecast({days, icon}) {
  return (
    <View style={styles.forecastContainer}>
      <View style={styles.forecastHeader}>
        <CalendarDaysIcon size={22} color={'white'} />
        <Text style={styles.forecastHeaderText}>5- dniowa prognoza pogody</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={true}
      >
        {days?.map((item, index) => {
          let date = new Date(item.date);
          let options = { weekday: 'long' };
          let dayName = date.toLocaleDateString('pl-Pl', options);
          dayName = dayName.split(',')[0];
          return (
            <View style={styles.forecastCard} key={index}>
              <Image
                // source={require('../assets/images/rainy-day.png')}
                source={{ uri: 'https:' + icon?.condition?.icon }}
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
  );
}
const styles = StyleSheet.create({
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
    marginTop: 15,
    marginBottom: 10,
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
