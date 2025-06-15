import { View, StyleSheet, Text, Linking, ScrollView } from 'react-native';
import { useTheme } from '../components/GlobalSettings/ThemeContext';
import StyledText from '../components/UI/StyledText';

export default function AboutScreen() {
  const { isDarkMode } = useTheme();
  const allList = [
    { id: 1, title: '• Wyszukiwanie lokalizacji' },
    { id: 2, title: '• Wyświetlanie prognozy na 5 dni' },
    { id: 3, title: '• Godzinowa i dzienna prognoza' },
    { id: 4, title: '• Jakość powietrza (Air Quality)' },
    { id: 5, title: '• Wschód i zachód słońca' },
    { id: 6, title: '• Tryb jasny i ciemny (Dark Mode)' },
    { id: 7, title: '• Tryb offline (obsługa braku internetu)' },
    { id: 8, title: '• Powiadomienia push (Expo Notifications)' },
    { id: 9, title: '• Ekrany: Ustawienia i O aplikacji' },
    { id: 10, title: '• Lokalne ikonki pogodowe' },
  ];
  const allListItems = [
    { id: 1, title: '• React Native + Expo' },
    { id: 2, title: '• React Navigation' },
    { id: 3, title: '• Context API (motyw)' },
    { id: 4, title: '• OpenWeatherMap API' },
    { id: 5, title: '• AsyncStorage' },
    { id: 6, title: '• Lodash (debounce)' },
    { id: 7, title: '• Expo Notifications' },
    { id: 8, title: '• Custom Hook (pobieranie pogody)' },
    {
      id: 9,
      title: '• Lokalna mapa ikon pogodowych (mapowanie opisu na obraz)',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.containerDark]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StyledText style={styles.header}>O aplikacji</StyledText>

      <StyledText style={styles.text}>
        Aplikacja pogodowa napisana w technologii
        <Text style={styles.bold}> React Native</Text>. Umożliwia użytkownikowi:
      </StyledText>

      <View style={styles.list}>
        {allList.map((item) => (
          <StyledText style={styles.text} key={item.id}>
            {item.title}
          </StyledText>
        ))}
      </View>

      <StyledText style={styles.subheader}>Technologie i narzędzia:</StyledText>

      <View style={styles.list}>
        {allListItems.map((item) => (
          <StyledText style={styles.text} key={item.id}>
            {item.title}
          </StyledText>
        ))}
      </View>

      <StyledText style={styles.text}>
        Autor: <Text style={styles.bold}>Kacper</Text>
      </StyledText>

      <Text
        style={[styles.link, isDarkMode && styles.textLinkDark]}
        onPress={() =>
          Linking.openURL('https://github.com/kacpi95/Weather-App-react-native')
        }
      >
        GitHub Kacper
      </Text>

      <StyledText style={styles.version}>Wersja: 1.0.0</StyledText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  containerDark: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 14,
    color: '#333',
    lineHeight: 24,
  },
  list: {
    marginLeft: 10,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  version: {
    marginTop: 30,
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 14,
  },
  textDark: {
    color: '#fff',
  },
  textLinkDark: {
    color: '#82bfff',
  },
});
