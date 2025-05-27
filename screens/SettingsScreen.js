import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import { useTheme } from '../components/GlobalSettings/ThemeContext';


export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.header, isDarkMode && styles.textDark]}>
        Ustawienia
      </Text>
      <View style={styles.row}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}></Text>
      </View>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
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
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
  },
  textDark: {
    color: '#fff',
  },
});
