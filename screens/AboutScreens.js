import { View, StyleSheet, Text, Linking, ScrollView } from 'react-native';
import { useTheme } from '../components/GlobalSettings/ThemeContext';

export default function AboutScreen() {
  const { isDarkMode } = useTheme();

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.header, isDarkMode && styles.textDark]}>
        O aplikacji
      </Text>

      <Text style={[styles.text, isDarkMode && styles.textDark]}>
        Aplikacja pogodowa napisana w technologii
        <Text style={styles.bold}>React Native</Text>. Umożliwia użytkownikowi:
      </Text>

      <View style={styles.list}>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Wyszukiwanie lokalizacji
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Wyświetlanie prognozy na 5 dni
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Godzinowa i dzienna prognoza
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Jakość powietrza (Air Quality)
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Wschód i zachód słońca
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Tryb jasny i ciemny (Dark Mode)
        </Text>
      </View>

      <Text style={[styles.text, isDarkMode && styles.textDark]}>
        Zastosowane technologie i narzędzia:
      </Text>

      <View style={styles.list}>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • React Native + Expo
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • React Navigation
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Context API (motyw)
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • OpenWeatherMap API
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • AsyncStorage
        </Text>
        <Text style={[styles.listItem, isDarkMode && styles.textDark]}>
          • Lodash (debounce)
        </Text>
      </View>

      <Text style={[styles.text, isDarkMode && styles.textDark]}>
        Autor: <Text style={styles.bold}>Kacper</Text>
      </Text>

      <Text
        style={[styles.link, isDarkMode && styles.textLinkDark]}
        onPress={() =>
          Linking.openURL('https://github.com/kacpi95/Weather-App-react-native')
        }
      >
        GitHub Kacper
      </Text>

      <Text style={[styles.version, isDarkMode && styles.textDark]}>
        Wersja: 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
