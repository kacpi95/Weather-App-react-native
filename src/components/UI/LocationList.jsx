import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/outline';

export default function LocationList({ locations, handleLocation }) {
  return (
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
            <Text style={styles.locationText}>
              {loc?.name}, {loc?.country}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
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
});
