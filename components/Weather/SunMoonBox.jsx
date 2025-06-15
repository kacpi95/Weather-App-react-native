import { View, StyleSheet, Text } from 'react-native';
import { SunIcon, MoonIcon } from 'react-native-heroicons/outline';
export default function SunMoonBox({ sunrise, sunset }) {
  return (
    <View style={styles.box}>
      <View style={styles.astronomyIconContainer}>
        <View style={styles.astronomyHeader}>
          <SunIcon size={22} color={'white'} />
          <Text style={styles.astronomyText}>Wschód słońca</Text>
        </View>
        <Text style={styles.astronomyHours}>{sunrise}</Text>
      </View>
      <View style={styles.astronomyIconContainer}>
        <View style={styles.astronomyHeader}>
          <MoonIcon size={22} color={'white'} />
          <Text style={styles.astronomyText}>Zachód słońca</Text>
        </View>
        <Text style={styles.astronomyHours}>{sunset}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginRight: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    padding: 14,
    borderRadius: 16,
  },
  astronomyIconContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  astronomyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  astronomyText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  astronomyHours: {
    marginTop: 4,
    marginBottom: 5,
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
