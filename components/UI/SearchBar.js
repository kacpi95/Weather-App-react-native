import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

export default function SearchBar({ showSearch, setSearch, onChangeText }) {
  return (
    <View
      style={[
        styles.searchBox,
        {
          backgroundColor: showSearch
            ? 'rgba(255, 255, 255, 0.38)'
            : 'transparent',
        },
      ]}
    >
      {showSearch ? (
        <TextInput
          onChangeText={onChangeText}
          placeholder='Szukaj miasta'
          placeholderTextColor={'lightgray'}
          style={styles.input}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => setSearch(!showSearch)}
        style={styles.searchButton}
      >
        <MagnifyingGlassIcon size={25} color='black' />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    paddingLeft: 24,
    height: 40,
    paddingBottom: 4,
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
    borderRadius: 50,
    padding: 12,
    margin: 4,
  },
});
