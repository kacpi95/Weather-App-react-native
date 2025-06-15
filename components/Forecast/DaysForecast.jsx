import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { weatherImages } from '../../api/index';

export default function DaysForecast({ days, icon }) {
  const [showAll, setShowAll] = useState(false);

  const daystoShow = showAll ? days : days?.slice(0, 3);
  return (
    <View style={styles.forecastContainer}>
      <View style={styles.forecastHeader}>
        <CalendarDaysIcon size={22} color={'white'} />
        <Text style={styles.forecastHeaderText}>
          {showAll ? '5- dniowa prognoza pogody' : '3-dniowa prognoza pogody'}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {daystoShow?.map((item, index) => {
          let date = new Date(item.date);
          let options = { weekday: 'long' };
          let dayName = date.toLocaleDateString('pl-Pl', options);
          dayName = dayName.split(',')[0];
          return (
            <View style={styles.forecastCard} key={index}>
              <Image
                source={
                  weatherImages[item?.day?.condition?.text?.toLowerCase()] ||
                  weatherImages['other']
                }
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
      <TouchableOpacity
        onPress={() => setShowAll(!showAll)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {showAll ? 'Pokaż mniej' : 'Pokaż więcej'}
        </Text>
      </TouchableOpacity>
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
    height: 80,
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
  button: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
