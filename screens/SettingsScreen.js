import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../components/GlobalSettings/ThemeContext';
import { useState } from 'react';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [information, setinformation] = useState(false);

  const toggleInformation = () => setinformation((prev) => !prev);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.header, isDarkMode && styles.textDark]}>
        Ustawienia
      </Text>
      <View style={styles.row}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>
          Tryb ciemny
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>
          Powiadomienia
        </Text>
        <Switch value={information} onValueChange={toggleInformation} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.subtext, isDarkMode && styles.textDark]}>
          Wersja aplikacji: 1.0.0
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.subtext, isDarkMode && styles.textDark]}>
          Aplikacja pogodowa. Autor: Kacper
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  containerDark: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  subtext: {
    fontSize: 14,
    color: '#666',
  },
  textDark: {
    color: '#fff',
  },
});
