import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../GlobalSettings/ThemeContext';

export default function StyledText({ children, style }) {
  const { isDarkMode } = useTheme();
  return (
    <Text style={[styles.text, isDarkMode && styles.textDark, style]}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
    lineHeight: 22,
  },
  textDark: {
    color: '#fff',
  },
});
