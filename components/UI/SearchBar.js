import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';

export default function SearchBar({ showSearch, setSearch, onChangeText }) {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
    onChangeText('');
  };
  const handleSubmit = () => {
    Keyboard.dismiss();
  };
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
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onChangeText(text);
          }}
          placeholder='Szukaj miasta'
          placeholderTextColor={'lightgray'}
          style={styles.input}
          returnKeyType='search'
          onSubmitEditing={handleSubmit}
          accessibilityLabel='Pole wyszukiwania'
          accessibilityHint='Wpisz nazwę miasta'
        />
      ) : null}
      {showSearch && searchText.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityLabel='Wyczyść pole wyszukiwania'
          accessibilityHint='Usuwa tekst z pola wyszukiwania'
        >
          <XMarkIcon size={20} color='black' />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => setSearch(!showSearch)}
        style={styles.searchButton}
        accessibilityLabel='Przycisk wyszukiwania'
        accessibilityHint='Kliknij, aby pokazać lub ukryć pasek wyszukiwania'
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
  clearButton: {
    padding: 8,
    marginRight: 4,
  },
});
